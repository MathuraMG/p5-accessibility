const Registry = {
    registry: [],
    register: function(entity) {
        this.registry.push(entity);
    },
    entityFor: name => {
        for (let i of this.registry.length) {
            let entity = i;
            if (entity.handles(name)) {
                return entity;
            }
        }
    }
}