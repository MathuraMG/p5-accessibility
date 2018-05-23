function BackgroundEntity(Interceptor, object, arguments, canvasX, canvasY) {
    let passedArguments = arguments;
    this.populate = function(Interceptor) {
        if (passedArguments[0].name === `p5.Color`) {
            passedArguments = passedArguments[0].levels;
        }
        Interceptor.bgColor = Interceptor.getColorName(passedArguments).color + Interceptor.getColorName(passedArguments).rgb;
    }

    this.populate(Interceptor);
}
BackgroundEntity.handledNames = [
    `background`
]

BackgroundEntity.handles = function(name) {
    return (this.handledNames.indexOf(name) >= 0);
}

BackgroundEntity.isParameter = true;

/* global Registry */
Registry.register(BackgroundEntity);