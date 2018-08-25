function TextEntity(Interceptor, shapeObject, textArgs, canvasX, canvasY) {
  const self = this;
  /* global BaseEntity */
  BaseEntity.call(self, shapeObject, textArgs, canvasX, canvasY);
  this.type = String(textArgs[0]).substring(0, 20) + `(` + Interceptor.currentColor + `)`;

  this.populate = function(shapeObject, textArgs, canvasX, canvasY) {
    this.location = this.getLocation(shapeObject, textArgs, canvasX, canvasY);
    this.coordLoc = this.canvasLocator(shapeObject, textArgs, canvasX, canvasY);
  };

  this.getAttributes = function() {
    return ({
      type: this.type,
      location: this.location,
      coordinates: this.coordinates,
    })
  };

  this.populate(shapeObject, textArgs, canvasX, canvasY);
}

TextEntity.handledNames = [
  `text`
]

TextEntity.handles = function(name) {
  return (this.handledNames.indexOf(name) >= 0);
}

TextEntity.isParameter = false;

/* global Registry */
Registry.register(TextEntity);
