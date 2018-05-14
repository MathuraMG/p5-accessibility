class FillEntity {
    constructor(Interceptor, shapeObject, argumentss, canvasX, canvasY) {
        this.self = this;
        this.passedArguments = argumentss;
        this.populate(Interceptor);
        this.handledNames = ['fill'];
        this.isParameter = true;
    }
    populate(Interceptor) {
        if (this.passedArguments[0].name == 'p5.Color') {
            this.passedArguments = this.passedArguments[0].levels;
        }
        Interceptor.currentColor = Interceptor.getColorName(this.passedArguments)['color'] + Interceptor.getColorName(this.passedArguments)['rgb'];
    }
    handles(name) {
        return (this.handledNames.indexOf(name) >= 0);
    }
}
Registry.register(FillEntity);