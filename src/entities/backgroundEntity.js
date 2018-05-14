class BackgroundEntity {
    constructor(Interceptor, object, argumentss, canvasX, canvasY) {
        this.passedArguments = argumentss;
        this.populate(Interceptor);
        this.handledNames = ['background'];
        this.isParameter = true;
    }
    populate(Interceptor) {
        if (this.passedArguments[0].name == 'p5.Color') {
            this.passedArguments = this.passedArguments[0].levels;
        }
        Interceptor.bgColor = Interceptor.getColorName(passedArguments)['color'] + Interceptor.getColorName(passedArguments)['rgb'];
    }

    handles(name) {
        return (this.handledNames.indexOf(name) >= 0);
    }
}
Registry.register(BackgroundEntity);