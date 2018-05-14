class TextEntity {
    constructor(Interceptor, shapeObject, argumentss, canvasX, canvasY) {
        const self = this;
        BaseEntity.call(self, shapeObject, argumentss, canvasX, canvasY);
        this.type = `${String(argumentss[0]).substring(0, 20)}(${Interceptor.currentColor})`;
        this.populate(shapeObject, argumentss, canvasX, canvasY);
        this.handledNames = ['text'];
        this.isParameter = false;
    }
    populate(shapeObject, argumentss, canvasX, canvasY) {
        this.location = this.getLocation(shapeObject, argumentss, canvasX, canvasY);
        this.coordLoc = this.canvasLocator(shapeObject, argumentss, canvasX, canvasY);
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