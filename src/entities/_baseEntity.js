function BaseEntity(Interceptor, object, arguments, canvasX, canvasY) {
    this.type = Interceptor.currentColor + ` ` + object.name,
        this.location = ``,
        this.coordinates = ``,
        this.isMember = function() {

        }

    this.getAttributes = function() {
        return ({
            type: this.type,
            location: this.location,
            coordinates: this.coordinates
        })
    };

    this.getLocation = function(object, arguments, canvasX, canvasY) { // eslint-disable-line
        let xCoord, yCoord;
        arguments = [].slice.call(arguments);
        let i = 0;
        const that = this;
        that.coordinates = ``;

        arguments.forEach((argument) => {
            const a = argument;
            if (object.params[i].description.indexOf(`x-coordinate`) > -1) {
                xCoord = a;
                that.coordinates += a + `x,`;
            } else if (object.params[i].description.indexOf(`y-coordinate`) > -1) {
                yCoord = a;
                that.coordinates += a + `y`;
            }
            i++;
        });

        if (xCoord < 0.4 * canvasX) {
            if (yCoord < 0.4 * canvasY) {
                return `top left`;
            } else if (yCoord > 0.6 * canvasY) {
                return `bottom left`;
            } else {
                return `mid left`;
            }
        } else if (xCoord > 0.6 * canvasX) {
            if (yCoord < 0.4 * canvasY) {
                return `top right`;
            } else if (yCoord > 0.6 * canvasY) {
                return `bottom right`;
            } else {
                return `mid right`;
            }
        } else {
            if (yCoord < 0.4 * canvasY) {
                return `top middle`;
            } else if (yCoord > 0.6 * canvasY) {
                return `bottom middle`;
            } else {
                return `middle`;
            }
        }
    }

    /* return which part of the canvas an object os present */
    this.canvasLocator = function(object, arguments, canvasX, canvasY) {
        let xCoord, yCoord;
        const noRows = 10,
            noCols = 10;
        let locX, locY;
        let i = 0;
        arguments = [].slice.call(arguments);
        arguments.forEach((argument) => {
            const a = argument;

            if (object.params[i].description.indexOf(`x-coordinate`) > -1) {
                xCoord = a;
            } else if (object.params[i].description.indexOf(`y-coordinate`) > -1) {
                yCoord = a;
            }
            i++;
        });

        locX = Math.floor((xCoord / canvasX) * noRows);
        locY = Math.floor((yCoord / canvasY) * noCols);
        if (locX === noRows) {
            locX = locX - 1;
        }
        if (locY === noCols) {
            locY = locY - 1;
        }
        return ({
            locX,
            locY
        });
    }
}

BaseEntity.isParameter = false;