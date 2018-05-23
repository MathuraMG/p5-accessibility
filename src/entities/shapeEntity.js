function ShapeEntity(Interceptor, shapeObject, arguments, canvasX, canvasY) {
    const self = this;
    /* global BaseEntity */
    BaseEntity.call(self, shapeObject, arguments, canvasX, canvasY);
    this.areaAbs = 0;
    this.type = Interceptor.currentColor + ` ` + shapeObject.name;
    this.area = 0;

    this.populate = function(shapeObject, arguments, canvasX, canvasY) {
        this.location = this.getLocation(shapeObject, arguments, canvasX, canvasY);
        this.areaAbs = this.getObjectArea(shapeObject.name, arguments);
        this.coordLoc = this.canvasLocator(shapeObject, arguments, canvasX, canvasY);
        this.area = (this.getObjectArea(shapeObject.name, arguments) * 100 / (canvasX * canvasY)).toFixed(2) + `%`;
    }

    this.getAttributes = function() {
        return ({
            type: this.type,
            location: this.location,
            coordinates: this.coordinates,
            area: this.area
        })
    };

    /* return area of the shape */
    this.getObjectArea = function(objectType, arguments) {
        let objectArea = 0;
        if (!objectType.localeCompare(`arc`)) {
            // area of full ellipse = PI * horizontal radius * vertical radius.
            // therefore, area of arc = difference bet. arc's start and end radians * horizontal radius * vertical radius.
            // the below expression is adjusted for negative values and differences in arc's start and end radians over PI*2  
            const arcSizeInRadians = ((((arguments[5] - arguments[4]) % (PI * 2)) + (PI * 2)) % (PI * 2));
            objectArea = arcSizeInRadians * arguments[2] * arguments[3] / 8;
            if (arguments[6] === `open` || arguments[6] === `chord`) {
                // when the arc's mode is OPEN or CHORD, we need to account for the area of the triangle that is formed to close the arc
                // (Ax( By −	Cy) +	Bx(Cy −	Ay) +	Cx(Ay −	By ) )/2
                const Ax = arguments[0];
                const Ay = arguments[1];
                const Bx = arguments[0] + (arguments[2] / 2) * cos(arguments[4]).toFixed(2);
                const By = arguments[1] + (arguments[3] / 2) * sin(arguments[4]).toFixed(2);
                const Cx = arguments[0] + (arguments[2] / 2) * cos(arguments[5]).toFixed(2);
                const Cy = arguments[1] + (arguments[3] / 2) * sin(arguments[5]).toFixed(2);
                const areaOfExtraTriangle = abs(Ax * (By - Cy) + Bx * (Cy - Ay) + Cx * (Ay - By)) / 2;
                if (arcSizeInRadians > PI) {
                    objectArea = objectArea + areaOfExtraTriangle;
                } else {
                    objectArea = objectArea - areaOfExtraTriangle;
                }
            }
        } else if (!objectType.localeCompare(`ellipse`)) {
            objectArea = 3.14 * arguments[2] * arguments[3] / 4;
        } else if (!objectType.localeCompare(`line`)) {
            objectArea = 0;
        } else if (!objectType.localeCompare(`point`)) {
            objectArea = 0;
        } else if (!objectType.localeCompare(`quad`)) {
            // x1y2+x2y3+x3y4+x4y1−x2y1−x3y2−x4y3−x1y4
            objectArea = (arguments[0] * arguments[1] + arguments[2] * arguments[3] +
                    arguments[4] * arguments[5] + arguments[6] * arguments[7]) -
                (arguments[2] * arguments[1] + arguments[4] * arguments[3] +
                    arguments[6] * arguments[5] + arguments[0] * arguments[7]);
        } else if (!objectType.localeCompare(`rect`)) {
            objectArea = arguments[2] * arguments[3];
        } else if (!objectType.localeCompare(`triangle`)) {
            objectArea = abs(arguments[0] * (arguments[3] - arguments[5]) + arguments[2] * (arguments[5] - arguments[1]) +
                arguments[4] * (arguments[1] - arguments[3])) / 2;
            // (Ax( By −	Cy) +	Bx(Cy −	Ay) +	Cx(Ay −	By ))/2
        }
        return objectArea;
    }

    this.populate(shapeObject, arguments, canvasX, canvasY);
}

ShapeEntity.handledNames = [
    `arc`,
    `ellipse`,
    `line`,
    `point`,
    `quad`,
    `rect`,
    `triangle`
]

ShapeEntity.handles = function(name) {
    return (this.handledNames.indexOf(name) >= 0);
}

ShapeEntity.isParameter = false;

/* global Registry */
Registry.register(ShapeEntity);