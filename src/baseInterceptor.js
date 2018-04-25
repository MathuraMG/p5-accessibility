class baseInterceptor {
    constructor() {
        this.prevTotalCount = 0,
            this.totalCount = 0,
            this.currentColor = 'white',
            this.bgColor = 'white',
            this.objectArea = 0,
            this.coordinates = [],
            this.objectDescription = '',
            this.canvasDetails = {
                width: 0,
                height: 0
            },
            this.setupObject = {
                objectArray: [],
                objectCount: 0,
                objectTypeCount: {}
            },
            this.drawObject = {
                objectArray: [],
                objectCount: 0,
                objectTypeCount: {}
            },
            this.isCleared = false;
    }
    getColorName(colorValues) {
        if (colorValues.length == 4) {
            return (getRGBAname(colorValues));
        } else if (colorValues.length == 3) {
            return (getRGBname(colorValues));
        } else if (colorValues.length == 2) {
            let trans = Math.round(100 - ((colorValues[1] * 100) / 255));
            // assuming that we are doing RGB - this would be a grayscale number
            if (colorValues[0] < 10) {
                let rgb = '(0, 0, 0)';
                if (trans == 0) {
                    return ({
                        'color': 'black',
                        'rgb': rgb
                    });
                } else {
                    return ({
                        'color': `black with ${trans}% tranparency`,
                        'rgb': rgb
                    });
                }
            } else if (colorValues[0] > 240) {
                let rgb = '(255, 255, 255)';
                if (trans == 0) {
                    return ({
                        'color': 'white',
                        'rgb': rgb
                    });
                } else {
                    return ({
                        'color': `white with ${trans}% tranparency`,
                        'rgb': rgb
                    });
                }
            } else {
                let rgb = `(${Math.round(colorValues[0])}, ${Math.round(colorValues[0])}, ${Math.round(colorValues[0])})`;
                if (trans == 0) {
                    return ({
                        'color': 'gray',
                        'rgb': rgb
                    });
                } else {
                    return ({
                        'color': `gray with ${trans}% tranparency`,
                        'rgb': rgb
                    });
                }
            }
        } else if (colorValues.length == 1) {
            if (!(typeof(colorValues[0])).localeCompare('number')) {
                // assuming that we are doing RGB - this would be a grayscale number
                if (colorValues[0] < 10) {
                    let rgb = '(0, 0, 0)';
                    return ({
                        'color': 'black',
                        'rgb': rgb
                    });
                } else if (colorValues[0] > 240) {
                    let rgb = '(255, 255, 255)';
                    return ({
                        'color': 'white',
                        'rgb': rgb
                    });
                } else {
                    let rgb = `(${colorValues[0]}, ${colorValues[0]}, ${colorValues[0]})`;
                    return ({
                        'color': 'grey',
                        'rgb': rgb
                    });
                }
            } else if (!(typeof(colorValues[0])).localeCompare('string')) {
                if (!colorValues[0].charAt(0).localeCompare('#')) {
                    return (getHexname(colorValues));
                } else if (colorValues[0].match(/rgba/)) {
                    return (RGBAString(colorValues));
                } else if (colorValues[0].match(/rgb/)) {
                    return (RGBString(colorValues));
                }
            }
        } else {
            return ({
                'color': colorValues[0],
                'rgb': ''
            });
        }
    }
}

function getRGBAname(colorValues) {
    let trans = Math.round(100 - ((colorValues[3] * 100)));
    let colorName = rgbColorName(colorValues[0], colorValues[1], colorValues[2]);
    let rgb = `(${Math.round(colorValues[0])}, ${Math.round(colorValues[1])}, ${Math.round(colorValues[2])})`;
    if (trans > 0) {
        return ({
            'color': `${colorName} with ${trans}% tranparency`,
            'rgb': rgb
        });
    } else {
        return ({
            'color': colorName,
            'rgb': rgb
        });
    }
}

function getRGBname(colorValues) {
    let colorName = rgbColorName(colorValues[0], colorValues[1], colorValues[2]);
    let rgb = `(${Math.round(colorValues[0])}, ${Math.round(colorValues[1])}, ${Math.round(colorValues[2])})`;
    return ({
        'color': colorName,
        'rgb': rgb
    });
}

function getHexname(colorValues) {
    let hex = colorValues[0].slice(1);
    if ((colorValues[0].match(/\w/g)).length == 3) { //3digithex
        let h3x = hex.match(/\w/g)
        hex = [h3x[0], h3x[0], h3x[1], h3x[1], h3x[2], h3x[2]].join('');
    }
    let colorName = hexColorName(hex);
    let r = parseInt(hex[1] + hex[2], 16);
    let g = parseInt(hex[3] + hex[4], 16);
    let b = parseInt(hex[5] + hex[6], 16);
    let rgb = `(${r}, ${g}, ${b})`;
    return ({
        'color': colorName,
        'rgb': rgb
    });
}

function RGBAString(colorValues) {
    if (colorValues[0].match(/%/)) {
        if (((colorValues[0].match(/%/g)).length) == 4) {
            //when colorValues[0] is 'rgba(10%,100%,30%,0.5%)'
            console.log(colorValues[0]);
            let values = (((colorValues[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?\s*?)/g))[0]).replace(/\%|\(|\)/g, "")).split(",");
            values = [values[0], values[1], values[3], 0];
            for (let i = values.length - 2; i >= 0; i--) {
                values[i] = parseInt(values[i]) < 100 ? Math.round(parseInt(values[i]) * 2.55) : 255;
            }
            return (getRGBAname(values));

        } else if (((colorValues[0].match(/%/g)).length) == 3 && ((colorValues[0].match(/\,/g)).length) == 2) {
            //when colorValues[0] is 'rgba(10%,100%,30%)'
            console.log(colorValues[0]);
            let values = (((colorValues[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%\)\s*?\s*?)/g))[0]).replace(/\%|\(|\)/g, "")).split(",");
            values = [values[0], values[1], values[2], 0];
            for (let i = values.length - 2; i >= 0; i--) {
                values[i] = parseInt(values[i]) < 100 ? Math.round(parseInt(values[i]) * 2.55) : 255;
            }
            return (getRGBAname(values));
        } else if (((colorValues[0].match(/%/g)).length) == 3) {
            //when colorValues[0] is 'rgba(10%,100%,30%,0.5)'
            //This line creates an array with the values in order the following order ["R","G","B","A"]. The RegEx looks for three values with percentages and one value without percentage.   
            let values = (((colorValues[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\))/g))[0]).replace(/\%|\(|\)/g, "")).split(",");
            for (let i = values.length - 2; i >= 0; i--) {
                values[i] = parseInt(values[i]) < 100 ? Math.round(parseInt(values[i]) * 2.55) : 255;
            }
            values[3] = parseFloat(values[3]);
            return (getRGBAname(values));
        } else {
            let values = [255, 255, 255, 0];
            return (getRGBAname(values));
        }
    } else {
        if (((colorValues[0].match(/\,/g)).length) == 2) {
            //when colorValues[0] is 'rgba(10,100,30)'
            console.log(colorValues[0]);
            let values = (((colorValues[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\)\s*?\s*?)/g))[0]).replace(/\%|\(|\)/g, "")).split(",");
            values = [values[0], values[1], values[2], 0];
            for (let i = values.length - 2; i >= 0; i--) {
                values[i] = parseInt(values[i]) < 100 ? Math.round(parseInt(values[i]) * 2.55) : 255;
            }
            return (getRGBAname(values));
        } else {
            //when colorValues[0] is 'rgba(10,100,30,0.5)'
            //This line creates an array with the values in order the following order ["R","G","B","A"]. Values must be less than 255.
            let values = (((colorValues[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\))/g))[0]).replace(/(\(|\))/g, "")).split(",");
            values = [parseInt(values[0]), parseInt(values[1]), parseInt(values[2]), parseFloat(values[3])];
            return (getRGBAname(values));
        }
    }
}

function RGBString(colorValues) {
    if (colorValues[0].match(/%/)) {
        if (((colorValues[0].match(/%/g)).length) == 3) {
            //when colorValues[0] is 'rgb(10%,100%,30%)'
            //This line creates an array with the values in order the following order ["R","G","B"]. The RegEx looks for three values with percentages.   
            let values = (((colorValues[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%\s*?\))/g))[0]).replace(/\%|\(|\)/g, "")).split(",");
            for (let i = values.length - 1; i >= 0; i--) {
                values[i] = parseInt(values[i]) < 100 ? Math.round(parseInt(values[i]) * 2.55) : 255;
            }
            return (getRGBname(values));
        } else {
            let values = [255, 255, 255];
            return (getRGBname(values));
        }
    } else {
        //when colorValues[0] is 'rgb(10,100,30)'
        //This line creates an array with the values in order the following order ["R","G","B"]. Values must be less than 255.  
        let values = (((colorValues[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\))/g))[0]).replace(/(\(|\))/g, "")).split(",");
        values = [parseInt(values[0]), parseInt(values[1]), parseInt(values[2])];
        return (getRGBname(values));
    }
}