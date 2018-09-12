function EllipseModeEntity(Interceptor, arguments) {
  const mode = arguments[0];
  this.populate = function(Interceptor) {
    Interceptor.currentEllipseMode = mode;
  }
  this.populate(Interceptor);
}

EllipseModeEntity.handledNames = [
  `ellipseMode`
]

EllipseModeEntity.handles = function(name) {
  return (this.handledNames.indexOf(name) >= 0);
}

EllipseModeEntity.isParameter = true;

/* global Registry */
Registry.register(EllipseModeEntity);
