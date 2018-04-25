class BaseEntity {
    constructor(Interceptor, object, arguments, canvasX, canvasY) {
        this.type = `${Interceptor.currentColor} ${object.name}`;
        this.location = '';
        this.coordinates = '';
    }
    getAttributes() {
        return ({
            type: this.type,
            location: this.location,
            coordinates: this.coordinates
        });
    }
    getLocation(object, arguments, canvasX, canvasY) {
            let xCoord, yCoord;
            arguments = [].slice.call(arguments);
            let that = this;
            that.coordinates = '';

            for (const [i, argument] of arguments) {
                if (object.params[i].description.indexOf('x-coordinate') > -1) {
                    xCoord = argument;
                    that.coordinates += `${a}x,`;
                } else if (object.params[i].description.indexOf('y-coordinate') > -1) {
                    yCoord = argument;
                    that.coordinates += `${a}y`;
                }
            }

            if (xCoord < 0.4 * canvasX) {
                if (yCoord < 0.4 * canvasY) {
                    return 'top left';
                } else if (yCoord > 0.6 * canvasY) {
                    return 'bottom left';
                } else {
                    return 'mid left';
                }
            } else if (xCoord > 0.6 * canvasX) {
                if (yCoord < 0.4 * canvasY) {
                    return 'top right';
                } else if (yCoord > 0.6 * canvasY) {
                    return 'bottom right';
                } else {
                    return 'mid right';
                }
            } else {
                if (yCoord < 0.4 * canvasY) {
                    return 'top middle';
                } else if (yCoord > 0.6 * canvasY) {
                    return 'bottom middle';
                } else {
                    return 'middle';
                }
            }
        }
        /* return which part of the canvas an object os present */
    canvasLocator(object, arguments, canvasX, canvasY) {
        let xCoord, yCoord;
        let noRows = 10,
            noCols = 10;
        let locX, locY;
        arguments = [].slice.call(arguments);
        for (const [i, argument] of arguments) {
            if (object.params[i].description.indexOf('x-coordinate') > -1) {
                xCoord = argument;
            } else if (object.params[i].description.indexOf('y-coordinate') > -1) {
                yCoord = argument;
            }
        }

        locX = Math.floor((xCoord / canvasX) * noRows);
        locY = Math.floor((yCoord / canvasY) * noCols);
        if (locX == noRows) {
            locX = locX - 1;
        }
        if (locY == noCols) {
            locY = locY - 1;
        }
        return ({
            locX,
            locY
        });
    }
}
BaseEntity.isParameter = false;