var Registry = {
  registry: [],
  register: function(entity) {
    this.registry.push(entity);
  },

  entityFor: function(name) {
    for (var i = 0; i < this.registry.length; i++) {
      var entity = this.registry[i];

      if (entity.handles(name)) {
        return entity;
      }
    }
  }
};
