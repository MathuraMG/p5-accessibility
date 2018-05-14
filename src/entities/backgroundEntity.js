class BackgroundEntity {
    constructor(Interceptor, object, arguments, canvasX, canvasY) {
        var self = this;
        var passedArguments = arguments;
        this.populate(Interceptor);
        this.handledNames = ['background'];
        this.isParameter = true;
    }
    populate(Interceptor) {
        if (passedArguments[0].name == 'p5.Color') {
            passedArguments = passedArguments[0].levels;
        }
        Interceptor.bgColor = Interceptor.getColorName(passedArguments)['color'] + Interceptor.getColorName(passedArguments)['rgb'];
    }

    handles(name) {
        return (this.handledNames.indexOf(name) >= 0);
    }
}
Registry.register(BackgroundEntity);