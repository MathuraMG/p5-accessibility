const Registry = {
    registry: [],
    register(entity) {
        this.registry.push(entity);
    },

    entityFor(name) {
        for (let i = 0; i < this.registry.length; i++) {
            const entity = this.registry[i];

            if (entity.handles(name)) {
                return entity;
            }
        }
    }
}