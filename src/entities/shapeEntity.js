/* global BaseEntity */
class ShapeEntity extends BaseEntity {
  constructor(Interceptor, shapeObject, shapeArgs, canvasX, canvasY) {
    super(Interceptor, shapeObject);
    this.shapeObject = shapeObject;
    this.areaAbs = 0;
    this.type = `${Interceptor.currentColor} ${shapeObject.name}`;
    this.area = 0;
    this.populate(shapeObject, shapeArgs, canvasX, canvasY);
  }
  populate(shapeObject, shapeArgs, canvasX, canvasY) {
    this.location = this.getLocation(shapeObject, shapeArgs, canvasX, canvasY);
    this.coordLoc = this.canvasLocator(shapeObject, shapeArgs, canvasX, canvasY);
    if (!shapeObject.name.localeCompare(`ellipse`) || !shapeObject.name.localeCompare(`rect`) || !shapeObject.name.localeCompare(`triangle`) || !shapeObject.name.localeCompare(`quad`)) {
      this.areaAbs = this.getObjectArea(shapeObject.name, arguments);
      this.area = (this.getObjectArea(shapeObject.name, arguments) * 100 / (canvasX * canvasY)).toFixed(2) + `%`;
    } else if (!shapeObject.name.localeCompare(`line`)) {
      this.length = this.getLineLength(arguments);
    }
  }
  getAttributes() {
    const {
      shapeObject,
      type,
      location,
      coordinates,
      area
    } = this;
    if ((!shapeObject.name.localeCompare(`ellipse`)) || !shapeObject.name.localeCompare(`rect`) || !shapeObject.name.localeCompare(`triangle`) || !shapeObject.name.localeCompare(`quad`)) {
      return ({
        type,
        location,
        coordinates,
        area
      });
    } else if (!shapeObject.name.localeCompare(`line`)) {
      return ({
        type,
        location,
        coordinates,
        length
      });
    } else {
      return ({
        type,
        location,
        coordinates
      });
    }
  }

  /* return length of lines */
  getLineLength(...args) {
    const {
      round,
      sqrt,
      pow
    } = Math;
    return round(sqrt((pow(args[2] - args[0], 2)) + (pow(args[3] - args[1], 2))));
  }

  /* return area of the shape */
  getObjectArea(objectType, shapeArgs) {
    let objectArea = 0;
    if (!objectType.localeCompare(`arc`)) {
      // area of full ellipse = PI * horizontal radius * vertical radius.
      // therefore, area of arc = difference bet. arc's start and end radians * horizontal radius * vertical radius.
      // the below expression is adjusted for negative values and differences in arc's start and end radians over PI*2
      const arcSizeInRadians = ((((shapeArgs[5] - shapeArgs[4]) % (PI * 2)) + (PI * 2)) % (PI * 2));
      objectArea = arcSizeInRadians * shapeArgs[2] * shapeArgs[3] / 8;
      if (shapeArgs[6] === `open` || shapeArgs[6] === `chord`) {
        // when the arc's mode is OPEN or CHORD, we need to account for the area of the triangle that is formed to close the arc
        // (Ax( By −	Cy) +	Bx(Cy −	Ay) +	Cx(Ay −	By ) )/2
        const Ax = shapeArgs[0];
        const Ay = shapeArgs[1];
        const Bx = shapeArgs[0] + (shapeArgs[2] / 2) * cos(shapeArgs[4]).toFixed(2);
        const By = shapeArgs[1] + (shapeArgs[3] / 2) * sin(shapeArgs[4]).toFixed(2);
        const Cx = shapeArgs[0] + (shapeArgs[2] / 2) * cos(shapeArgs[5]).toFixed(2);
        const Cy = shapeArgs[1] + (shapeArgs[3] / 2) * sin(shapeArgs[5]).toFixed(2);
        const areaOfExtraTriangle = abs(Ax * (By - Cy) + Bx * (Cy - Ay) + Cx * (Ay - By)) / 2;
        if (arcSizeInRadians > PI) {
          objectArea = objectArea + areaOfExtraTriangle;
        } else {
          objectArea = objectArea - areaOfExtraTriangle;
        }
      }
    } else if (!objectType.localeCompare(`ellipse`)) {
      objectArea = 3.14 * shapeArgs[2] * shapeArgs[3] / 4;
    } else if (!objectType.localeCompare(`line`)) {
      objectArea = 0;
    } else if (!objectType.localeCompare(`point`)) {
      objectArea = 0;
    } else if (!objectType.localeCompare(`quad`)) {
      // ((x4+x1)*(y4-y1)+(x1+x2)*(y1-y2)+(x2+x3)*(y2-y3)+(x3+x4)*(y3-y4))/2
      objectArea = abs(
        (shapeArgs[6] + shapeArgs[0]) * (shapeArgs[7] - shapeArgs[1]) +
                (shapeArgs[0] + shapeArgs[2]) * (shapeArgs[1] - shapeArgs[3]) +
                (shapeArgs[2] + shapeArgs[4]) * (shapeArgs[3] - shapeArgs[5]) +
                (shapeArgs[4] + shapeArgs[6]) * (shapeArgs[5] - shapeArgs[7])
      ) / 2;
    } else if (!objectType.localeCompare(`rect`)) {
      objectArea = shapeArgs[2] * shapeArgs[3];
    } else if (!objectType.localeCompare(`triangle`)) {
      objectArea = abs(shapeArgs[0] * (shapeArgs[3] - shapeArgs[5]) + shapeArgs[2] * (shapeArgs[5] - shapeArgs[1]) +
                shapeArgs[4] * (shapeArgs[1] - shapeArgs[3])) / 2;
      // (Ax( By −	Cy) +	Bx(Cy −	Ay) +	Cx(Ay −	By ))/2
    }
    return objectArea;
  }
}

ShapeEntity.handledNames = [`arc`, `ellipse`, `line`, `point`, `quad`, `rect`, `triangle`];

ShapeEntity.handles = function(name) {
  return (this.handledNames.indexOf(name) >= 0);
}

ShapeEntity.isParameter = false;

/* global Registry */
Registry.register(ShapeEntity);