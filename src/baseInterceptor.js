const MAX_OBJECTS = 20;

function baseInterceptor() {
  this.prevTotalCount = 0,
  this.totalCount = 0,
  this.currentColor = `white`,
  this.currentEllipseMode = `center`,
  this.bgColor = `white`,
  this.objectArea = 0,
  this.coordinates = [],
  this.objectDescription = ``,
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

baseInterceptor.prototype.getColorName = function(colArgs) {
  if (colArgs.length === 4) {
    return (getRGBAname(colArgs));
  } else if (colArgs.length === 3) {
    return (getRGBname(colArgs));
  } else if (colArgs.length === 2) {
    const trans = Math.round(100 - ((colArgs[1] * 100) / 255));
    // assuming that we are doing RGB - this would be a grayscale number
    if (colArgs[0] < 10) {
      const rgb = `(0, 0, 0)`;
      if (trans === 0) {
        return ({
          'color': `black` + ` `,
          rgb
        });
      } else {
        return ({
          'color': `black with ` + trans + `% tranparency` + ` `,
          rgb
        });
      }
    } else if (colArgs[0] > 240) {
      const rgb = `(255, 255, 255)`;
      if (trans === 0) {
        return ({
          'color': `white` + ` `,
          rgb
        });
      } else {
        return ({
          'color': `white with ` + trans + `% tranparency` + ` `,
          rgb
        });
      }
    } else {
      const rgb = `(` + Math.round(colArgs[0]) + `, ` + Math.round(colArgs[0]) + `, ` + Math.round(colArgs[0]) + `)`;
      if (trans === 0) {
        return ({
          'color': `gray` + ` `,
          rgb
        });
      } else {
        return ({
          'color': `gray with ` + trans + `% tranparency` + ` `,
          rgb
        });
      }
    }
  } else if (colArgs.length === 1) {
    if (!(typeof(colArgs[0])).localeCompare(`number`)) {
      if (colArgs[0] < 10) {
        const rgb = `(0, 0, 0)`;
        return ({
          'color': `black` + ` `,
          rgb
        });
      } else if (colArgs[0] > 240) {
        const rgb = `(255, 255, 255)`;
        return ({
          'color': `white` + ` `,
          rgb
        });
      } else {
        const rgb = `(` + colArgs[0] + `, ` + colArgs[0] + `, ` + colArgs[0] + `)`;
        return ({
          'color': `grey` + ` `,
          rgb
        });
      }
    } else if (!(typeof(colArgs[0])).localeCompare(`string`)) {
      if (!colArgs[0].charAt(0).localeCompare(`#`)) {
        return (getHexname(colArgs));
      } else if (colArgs[0].match(/rgba/)) {
        return (RGBAString(colArgs));
      } else if (colArgs[0].match(/rgb/)) {
        return (RGBString(colArgs));
      } else if (htmlColors.filter(hc => hc.name === colArgs[0].toUpperCase()).length !== 0) {
        for (let i = htmlColors.length - 1; i >= 0; i--) {
          if (htmlColors[i].name === colArgs[0].toUpperCase()) {
            return (getHexname([htmlColors[i].hex]));
          }
        }
      } else {
        return ({
          'color': `white` + ` `,
          'rgb': `(255, 255, 255)`
        });
      }
    }
  } else {
    return ({
      'color': `white` + ` `,
      'rgb': `(255, 255, 255)`
    });
  }
}

const htmlColors = [{
  'name': `ALICEBLUE`,
  'hex': `#F0F8FF`
}, {
  'name': `ANTIQUEWHITE`,
  'hex': `#FAEBD7`
}, {
  'name': `AQUA`,
  'hex': `#00FFFF`
}, {
  'name': `AQUAMARINE`,
  'hex': `#7FFFD4`
}, {
  'name': `AZURE`,
  'hex': `#F0FFFF`
}, {
  'name': `BEIGE`,
  'hex': `#F5F5DC`
}, {
  'name': `BISQUE`,
  'hex': `#FFE4C4`
}, {
  'name': `BLACK`,
  'hex': `#000000`
}, {
  'name': `BLANCHEDALMOND`,
  'hex': `#FFEBCD`
}, {
  'name': `BLUE`,
  'hex': `#0000FF`
}, {
  'name': `BLUEVIOLET`,
  'hex': `#8A2BE2`
}, {
  'name': `BROWN`,
  'hex': `#A52A2A`
}, {
  'name': `BURLYWOOD`,
  'hex': `#DEB887`
}, {
  'name': `CADETBLUE`,
  'hex': `#5F9EA0`
}, {
  'name': `CHARTREUSE`,
  'hex': `#7FFF00`
}, {
  'name': `CHOCOLATE`,
  'hex': `#D2691E`
}, {
  'name': `CORAL`,
  'hex': `#FF7F50`
}, {
  'name': `CORNFLOWERBLUE`,
  'hex': `#6495ED`
}, {
  'name': `CORNSILK`,
  'hex': `#FFF8DC`
}, {
  'name': `CRIMSON`,
  'hex': `#DC143C`
}, {
  'name': `CYAN`,
  'hex': `#00FFFF`
}, {
  'name': `DARKBLUE`,
  'hex': `#00008B`
}, {
  'name': `DARKCYAN`,
  'hex': `#008B8B`
}, {
  'name': `DARKGOLDENROD`,
  'hex': `#B8860B`
}, {
  'name': `DARKGRAY`,
  'hex': `#A9A9A9`
}, {
  'name': `DARKGREY`,
  'hex': `#A9A9A9`
}, {
  'name': `DARKGREEN`,
  'hex': `#006400`
}, {
  'name': `DARKKHAKI`,
  'hex': `#BDB76B`
}, {
  'name': `DARKMAGENTA`,
  'hex': `#8B008B`
}, {
  'name': `DARKOLIVEGREEN`,
  'hex': `#556B2F`
}, {
  'name': `DARKORANGE`,
  'hex': `#FF8C00`
}, {
  'name': `DARKORCHID`,
  'hex': `#9932CC`
}, {
  'name': `DARKRED`,
  'hex': `#8B0000`
}, {
  'name': `DARKSALMON`,
  'hex': `#E9967A`
}, {
  'name': `DARKSEAGREEN`,
  'hex': `#8FBC8F`
}, {
  'name': `DARKSLATEBLUE`,
  'hex': `#483D8B`
}, {
  'name': `DARKSLATEGRAY`,
  'hex': `#2F4F4F`
}, {
  'name': `DARKSLATEGREY`,
  'hex': `#2F4F4F`
}, {
  'name': `DARKTURQUOISE`,
  'hex': `#00CED1`
}, {
  'name': `DARKVIOLET`,
  'hex': `#9400D3`
}, {
  'name': `DEEPPINK`,
  'hex': `#FF1493`
}, {
  'name': `DEEPSKYBLUE`,
  'hex': `#00BFFF`
}, {
  'name': `DIMGRAY`,
  'hex': `#696969`
}, {
  'name': `DIMGREY`,
  'hex': `#696969`
}, {
  'name': `DODGERBLUE`,
  'hex': `#1E90FF`
}, {
  'name': `FIREBRICK`,
  'hex': `#B22222`
}, {
  'name': `FLORALWHITE`,
  'hex': `#FFFAF0`
}, {
  'name': `FORESTGREEN`,
  'hex': `#228B22`
}, {
  'name': `FUCHSIA`,
  'hex': `#FF00FF`
}, {
  'name': `GAINSBORO`,
  'hex': `#DCDCDC`
}, {
  'name': `GHOSTWHITE`,
  'hex': `#F8F8FF`
}, {
  'name': `GOLD`,
  'hex': `#FFD700`
}, {
  'name': `GOLDENROD`,
  'hex': `#DAA520`
}, {
  'name': `GRAY`,
  'hex': `#808080`
}, {
  'name': `GREY`,
  'hex': `#808080`
}, {
  'name': `GREEN`,
  'hex': `#008000`
}, {
  'name': `GREENYELLOW`,
  'hex': `#ADFF2F`
}, {
  'name': `HONEYDEW`,
  'hex': `#F0FFF0`
}, {
  'name': `HOTPINK`,
  'hex': `#FF69B4`
}, {
  'name': `INDIANRED`,
  'hex': `#CD5C5C`
}, {
  'name': `INDIGO`,
  'hex': `#4B0082`
}, {
  'name': `IVORY`,
  'hex': `#FFFFF0`
}, {
  'name': `KHAKI`,
  'hex': `#F0E68C`
}, {
  'name': `LAVENDER`,
  'hex': `#E6E6FA`
}, {
  'name': `LAVENDERBLUSH`,
  'hex': `#FFF0F5`
}, {
  'name': `LAWNGREEN`,
  'hex': `#7CFC00`
}, {
  'name': `LEMONCHIFFON`,
  'hex': `#FFFACD`
}, {
  'name': `LIGHTBLUE`,
  'hex': `#ADD8E6`
}, {
  'name': `LIGHTCORAL`,
  'hex': `#F08080`
}, {
  'name': `LIGHTCYAN`,
  'hex': `#E0FFFF`
}, {
  'name': `LIGHTGOLDENRODYELLOW`,
  'hex': `#FAFAD2`
}, {
  'name': `LIGHTGRAY`,
  'hex': `#D3D3D3`
}, {
  'name': `LIGHTGREY`,
  'hex': `#D3D3D3`
}, {
  'name': `LIGHTGREEN`,
  'hex': `#90EE90`
}, {
  'name': `LIGHTPINK`,
  'hex': `#FFB6C1`
}, {
  'name': `LIGHTSALMON`,
  'hex': `#FFA07A`
}, {
  'name': `LIGHTSEAGREEN`,
  'hex': `#20B2AA`
}, {
  'name': `LIGHTSKYBLUE`,
  'hex': `#87CEFA`
}, {
  'name': `LIGHTSLATEGRAY`,
  'hex': `#778899`
}, {
  'name': `LIGHTSLATEGREY`,
  'hex': `#778899`
}, {
  'name': `LIGHTSTEELBLUE`,
  'hex': `#B0C4DE`
}, {
  'name': `LIGHTYELLOW`,
  'hex': `#FFFFE0`
}, {
  'name': `LIME`,
  'hex': `#00FF00`
}, {
  'name': `LIMEGREEN`,
  'hex': `#32CD32`
}, {
  'name': `LINEN`,
  'hex': `#FAF0E6`
}, {
  'name': `MAGENTA`,
  'hex': `#FF00FF`
}, {
  'name': `MAROON`,
  'hex': `#800000`
}, {
  'name': `MEDIUMAQUAMARINE`,
  'hex': `#66CDAA`
}, {
  'name': `MEDIUMBLUE`,
  'hex': `#0000CD`
}, {
  'name': `MEDIUMORCHID`,
  'hex': `#BA55D3`
}, {
  'name': `MEDIUMPURPLE`,
  'hex': `#9370DB`
}, {
  'name': `MEDIUMSEAGREEN`,
  'hex': `#3CB371`
}, {
  'name': `MEDIUMSLATEBLUE`,
  'hex': `#7B68EE`
}, {
  'name': `MEDIUMSPRINGGREEN`,
  'hex': `#00FA9A`
}, {
  'name': `MEDIUMTURQUOISE`,
  'hex': `#48D1CC`
}, {
  'name': `MEDIUMVIOLETRED`,
  'hex': `#C71585`
}, {
  'name': `MIDNIGHTBLUE`,
  'hex': `#191970`
}, {
  'name': `MINTCREAM`,
  'hex': `#F5FFFA`
}, {
  'name': `MISTYROSE`,
  'hex': `#FFE4E1`
}, {
  'name': `MOCCASIN`,
  'hex': `#FFE4B5`
}, {
  'name': `NAVAJOWHITE`,
  'hex': `#FFDEAD`
}, {
  'name': `NAVY`,
  'hex': `#000080`
}, {
  'name': `OLDLACE`,
  'hex': `#FDF5E6`
}, {
  'name': `OLIVE`,
  'hex': `#808000`
}, {
  'name': `OLIVEDRAB`,
  'hex': `#6B8E23`
}, {
  'name': `ORANGE`,
  'hex': `#FFA500`
}, {
  'name': `ORANGERED`,
  'hex': `#FF4500`
}, {
  'name': `ORCHID`,
  'hex': `#DA70D6`
}, {
  'name': `PALEGOLDENROD`,
  'hex': `#EEE8AA`
}, {
  'name': `PALEGREEN`,
  'hex': `#98FB98`
}, {
  'name': `PALETURQUOISE`,
  'hex': `#AFEEEE`
}, {
  'name': `PALEVIOLETRED`,
  'hex': `#DB7093`
}, {
  'name': `PAPAYAWHIP`,
  'hex': `#FFEFD5`
}, {
  'name': `PEACHPUFF`,
  'hex': `#FFDAB9`
}, {
  'name': `PERU`,
  'hex': `#CD853F`
}, {
  'name': `PINK`,
  'hex': `#FFC0CB`
}, {
  'name': `PLUM`,
  'hex': `#DDA0DD`
}, {
  'name': `POWDERBLUE`,
  'hex': `#B0E0E6`
}, {
  'name': `PURPLE`,
  'hex': `#800080`
}, {
  'name': `REBECCAPURPLE`,
  'hex': `#663399`
}, {
  'name': `RED`,
  'hex': `#FF0000`
}, {
  'name': `ROSYBROWN`,
  'hex': `#BC8F8F`
}, {
  'name': `ROYALBLUE`,
  'hex': `#4169E1`
}, {
  'name': `SADDLEBROWN`,
  'hex': `#8B4513`
}, {
  'name': `SALMON`,
  'hex': `#FA8072`
}, {
  'name': `SANDYBROWN`,
  'hex': `#F4A460`
}, {
  'name': `SEAGREEN`,
  'hex': `#2E8B57`
}, {
  'name': `SEASHELL`,
  'hex': `#FFF5EE`
}, {
  'name': `SIENNA`,
  'hex': `#A0522D`
}, {
  'name': `SILVER`,
  'hex': `#C0C0C0`
}, {
  'name': `SKYBLUE`,
  'hex': `#87CEEB`
}, {
  'name': `SLATEBLUE`,
  'hex': `#6A5ACD`
}, {
  'name': `SLATEGRAY`,
  'hex': `#708090`
}, {
  'name': `SLATEGREY`,
  'hex': `#708090`
}, {
  'name': `SNOW`,
  'hex': `#FFFAFA`
}, {
  'name': `SPRINGGREEN`,
  'hex': `#00FF7F`
}, {
  'name': `STEELBLUE`,
  'hex': `#4682B4`
}, {
  'name': `TAN`,
  'hex': `#D2B48C`
}, {
  'name': `TEAL`,
  'hex': `#008080`
}, {
  'name': `THISTLE`,
  'hex': `#D8BFD8`
}, {
  'name': `TOMATO`,
  'hex': `#FF6347`
}, {
  'name': `TURQUOISE`,
  'hex': `#40E0D0`
}, {
  'name': `VIOLET`,
  'hex': `#EE82EE`
}, {
  'name': `WHEAT`,
  'hex': `#F5DEB3`
}, {
  'name': `WHITE`,
  'hex': `#FFFFFF`
}, {
  'name': `WHITESMOKE`,
  'hex': `#F5F5F5`
}, {
  'name': `YELLOW`,
  'hex': `#FFFF00`
}, {
  'name': `YELLOWGREEN`,
  'hex': `#9ACD32`
}];

function getRGBAname(colArgs) {
  const trans = Math.round(100 - ((colArgs[3] * 100)));
  /* global rgbColorName */
  const colorName = rgbColorName(colArgs[0], colArgs[1], colArgs[2]);
  const rgb = `(` + Math.round(colArgs[0]) + `, ` + Math.round(colArgs[1]) + `, ` + Math.round(colArgs[2]) + `)`;
  if (trans > 0) {
    return ({
      'color': colorName + ` with ` + trans + `% tranparency`,
      rgb
    });
  } else {
    return ({
      'color': colorName + ` `,
      rgb
    });
  }
}

function getRGBname(colArgs) {
  const colorName = rgbColorName(colArgs[0], colArgs[1], colArgs[2]);
  const rgb = `(` + Math.round(colArgs[0]) + `, ` + Math.round(colArgs[1]) + `, ` + Math.round(colArgs[2]) + `)`;
  return ({
    'color': colorName + ` `,
    rgb
  });
}

function getHexname(colArgs) {
  let hex = colArgs[0].slice(1);
  if ((colArgs[0].match(/\w/g)).length === 3) { // 3digithex
    const h3x = hex.match(/\w/g)
    hex = [h3x[0], h3x[0], h3x[1], h3x[1], h3x[2], h3x[2]].join(``);
  }
  /* global hexColorName */
  const colorName = hexColorName(hex);
  const r = parseInt(hex[0] + hex[1], 16);
  const g = parseInt(hex[2] + hex[3], 16);
  const b = parseInt(hex[4] + hex[5], 16);
  const rgb = `(` + r + `, ` + g + `, ` + b + `)`;
  return ({
    'color': colorName + ` `,
    rgb
  });
}

function RGBAString(colArgs) {
  if (colArgs[0].match(/%/)) {
    if (((colArgs[0].match(/%/g)).length) === 4) {
      // when colArgs[0] is 'rgba(10%,100%,30%,0.5%)'
      let values = (((colArgs[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?\s*?)/g))[0]).replace(/%|\(|\)/g, ``)).split(`,`);
      values = [values[0], values[1], values[3], 0];
      for (let i = values.length - 2; i >= 0; i--) {
        if (parseInt(values[i]) < 100) {
          values[i] = Math.round(parseInt(values[i]) * 2.55);
        } else {
          values[i] = 255;
        }
      }
      return (getRGBAname(values));

    } else if (((colArgs[0].match(/%/g)).length) === 3 && ((colArgs[0].match(/,/g)).length) === 2) {
      // when colArgs[0] is 'rgba(10%,100%,30%)'
      let values = (((colArgs[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%\)\s*?\s*?)/g))[0]).replace(/%|\(|\)/g, ``)).split(`,`);
      values = [values[0], values[1], values[2], 0];
      for (let i = values.length - 2; i >= 0; i--) {
        if (parseInt(values[i]) < 100) {
          values[i] = Math.round(parseInt(values[i]) * 2.55);
        } else {
          values[i] = 255;
        }
      }
      return (getRGBAname(values));
    } else if (((colArgs[0].match(/%/g)).length) === 3) {
      // when colArgs[0] is 'rgba(10%,100%,30%,0.5)'
      // This line creates an array with the values in order the following order ['R','G','B','A']. The RegEx looks for three values with percentages and one value without percentage.   
      const values = (((colArgs[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\))/g))[0]).replace(/%|\(|\)/g, ``)).split(`,`);
      for (let i = values.length - 2; i >= 0; i--) {
        if (parseInt(values[i]) < 100) {
          values[i] = Math.round(parseInt(values[i]) * 2.55);
        } else {
          values[i] = 255;
        }
      }
      values[3] = parseFloat(values[3]);
      return (getRGBAname(values));
    } else {
      const values = [255, 255, 255, 0];
      return (getRGBAname(values));
    }
  } else {
    if (((colArgs[0].match(/,/g)).length) === 2) {
      // when colArgs[0] is 'rgba(10,100,30)'
      let values = (((colArgs[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\)\s*?\s*?)/g))[0]).replace(/%|\(|\)/g, ``)).split(`,`);
      values = [values[0], values[1], values[2], 0];
      for (let i = values.length - 2; i >= 0; i--) {
        if (parseInt(values[i]) < 100) {
          values[i] = Math.round(parseInt(values[i]) * 2.55);
        } else {
          values[i] = 255;
        }
      }
      return (getRGBAname(values));
    } else {
      // when colArgs[0] is 'rgba(10,100,30,0.5)'
      // This line creates an array with the values in order the following order ['R','G','B','A']. Values must be less than 255.
      let values = (((colArgs[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\))/g))[0]).replace(/(\(|\))/g, ``)).split(`,`);
      values = [parseInt(values[0]), parseInt(values[1]), parseInt(values[2]), parseFloat(values[3])];
      return (getRGBAname(values));
    }
  }
}

function RGBString(colArgs) {
  if (colArgs[0].match(/%/)) {
    if (((colArgs[0].match(/%/g)).length) === 3) {
      // when colArgs[0] is 'rgb(10%,100%,30%)'
      // This line creates an array with the values in order the following order ['R','G','B']. The RegEx looks for three values with percentages.   
      const values = (((colArgs[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%\s*?\))/g))[0]).replace(/%|\(|\)/g, ``)).split(`,`);
      for (let i = values.length - 1; i >= 0; i--) {
        if (parseInt(values[i]) < 100) {
          values[i] = Math.round(parseInt(values[i]) * 2.55);
        } else {
          values[i] = 255;
        }
      }
      return (getRGBname(values));
    } else {
      const values = [255, 255, 255];
      return (getRGBname(values));
    }
  } else {
    // when colArgs[0] is 'rgb(10,100,30)'
    // This line creates an array with the values in order the following order ['R','G','B']. Values must be less than 255.  
    let values = (((colArgs[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\))/g))[0]).replace(/(\(|\))/g, ``)).split(`,`);
    values = [parseInt(values[0]), parseInt(values[1]), parseInt(values[2])];
    return (getRGBname(values));
  }
}