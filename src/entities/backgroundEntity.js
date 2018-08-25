function BackgroundEntity(Interceptor, object, backgroundArgs, canvasX, canvasY) { // eslint-disable-line no-unused-vars
  this.populate = function(Interceptor) {
    if (backgroundArgs[0].name === `p5.Color`) {
      backgroundArgs = backgroundArgs[0].levels;
    }
    Interceptor.bgColor = Interceptor.getColorName(backgroundArgs).color + Interceptor.getColorName(backgroundArgs).rgb;
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
