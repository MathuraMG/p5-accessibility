var Registry = {
    registry: [],
    register: entity => this.registry.push(entity),
    entityFor: name => {
        for (let i of this.registry.length) {
            var entity = i;
            if (entity.handles(name)) {
                return entity;
            }
        }
    }
}