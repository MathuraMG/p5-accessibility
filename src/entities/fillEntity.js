function FillEntity(Interceptor, shapeObject, fillArgs, canvasX, canvasY) // eslint-disable-line no-unused-vars
{
  this.populate = function(Interceptor) {
    if (fillArgs[0].name === `p5.Color`) {
      fillArgs = fillArgs[0].levels;
    }
    Interceptor.currentColor = Interceptor.getColorName(fillArgs).color + Interceptor.getColorName(fillArgs).rgb;
  }

  this.populate(Interceptor);
}
FillEntity.handledNames = [
  `fill`
]

FillEntity.handles = function(name) {
  return (this.handledNames.indexOf(name) >= 0);
}

FillEntity.isParameter = true;

/* global Registry */
Registry.register(FillEntity);
