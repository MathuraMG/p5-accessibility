class TextEntity {
    constructor(Interceptor, shapeObject, arguments, canvasX, canvasY) {
        const self = this;
        BaseEntity.call(self, shapeObject, arguments, canvasX, canvasY);
        this.type = `${String(arguments[0]).substring(0, 20)}(${Interceptor.currentColor})`;
        this.populate(shapeObject, arguments, canvasX, canvasY);
        this.handledNames = ['text'];
        this.isParameter = false;
    }
    populate(shapeObject, arguments, canvasX, canvasY) {
        this.location = this.getLocation(shapeObject, arguments, canvasX, canvasY);
        this.coordLoc = this.canvasLocator(shapeObject, arguments, canvasX, canvasY);
    }
    getAttributes() {
        return ({
            type: this.type,
            location: this.location,
            coordinates: this.coordinates,
        })
    }
    handles(name) {
        return (this.handledNames.indexOf(name) >= 0);
    }
}
Registry.register(TextEntity);