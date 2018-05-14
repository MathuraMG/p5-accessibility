function textInterceptor() { // eslint-disable-line
    let self = this;
    baseInterceptor.call(self);
}
textInterceptor.prototype = Object.create(baseInterceptor.prototype);

textInterceptor.prototype.clearletiables = function(object) {
    object.objectTypeCount = {};
    object.objectArray = [];
    object.objectCount = 0;
    this.isCleared = true;
    return object;
}

textInterceptor.prototype.populateObject = function(x, arguments, object, table, isDraw) {
    objectCount = object.objectCount;
    objectArray = object.objectArray;
    objectTypeCount = object.objectTypeCount;
    if (!isDraw) {
        // check for special function in setup -> createCanvas
        if (!x.name.localeCompare('createCanvas')) {
            this.canvasDetails.width = arguments[0];
            this.canvasDetails.height = arguments[1];
        }
    }

    let entityClass = Registry.entityFor(x.name);

    if (entityClass && !entityClass.isParameter) {
        objectArray[objectCount] = new entityClass(this, x, arguments, this.canvasDetails.width, this.canvasDetails.height);

        if (objectTypeCount[x.name]) {
            objectTypeCount[x.name]++;
        } else {
            objectTypeCount[x.name] = 1;
        }
        objectCount++;
    } else if (entityClass && entityClass.isParameter) {
        new entityClass(this, x, arguments, this.canvasDetails.width, this.canvasDetails.height);
    }
    return ({
        objectCount: objectCount,
        objectArray: objectArray,
        objectTypeCount: objectTypeCount
    });
}

textInterceptor.prototype.populateTable = function(table, objectArray) {
    if (this.totalCount < 100) {
        if (this.prevTotalCount > this.totalCount) {
            for (let j = 0; j < this.totalCount; j++) {
                let row = table.children[j];
                let tempCol = row.children.length;
                let properties = Object.keys(objectArray[j].getAttributes());

                if (tempCol < properties.length) { // ie - there are more cols now
                    for (let i = 0; i < tempCol; i++) {
                        if (properties[i].localeCompare('type')) {
                            row.children[i].innerHTML = properties[i] + ' = ' + objectArray[j][properties[i]];
                        } else {
                            row.children[i].innerHTML = objectArray[j][properties[i]];
                        }
                    }
                    for (let i = tempCol; i < properties.length; i++) {
                        let col = document.createElement('td');
                        if (properties[i].localeCompare('type')) {
                            col.children[i].innerHTML = properties[i] + ' = ' + objectArray[j][properties[i]];
                        } else {
                            col.children[i].innerHTML = objectArray[j][properties[i]];
                        }

                        row.appendChild(col);
                    }
                } else { // ie - there are fewer cols now
                    for (let i = 0; i < properties.length; i++) {
                        if (properties[i].localeCompare('type')) {
                            row.children[i].innerHTML = properties[i] + ' = ' + objectArray[j][properties[i]];
                        } else {
                            row.children[i].innerHTML = objectArray[j][properties[i]];
                        }
                    }
                    for (let i = properties.length; i < tempCol; i++) {
                        let tempCol = row.children[i];
                        row.removeChild(tempCol);
                    }
                }
            }
            for (let j = this.totalCount; j < this.prevTotalCount; j++) {
                let tempRow = table.children[this.totalCount];
                table.removeChild(tempRow);
            }
        } else if (this.prevTotalCount <= this.totalCount) {
            for (let j = 0; j < this.prevTotalCount; j++) {
                let row = table.children[j];
                let tempCol = row.children.length;
                let properties = Object.keys(objectArray[j].getAttributes());

                if (tempCol < properties.length) { // ie - there are more cols now
                    for (let i = 0; i <= tempCol; i++) {
                        if (properties[i].localeCompare('type')) {
                            row.children[i].innerHTML = properties[i] + ' = ' + objectArray[j][properties[i]];
                        } else {
                            row.children[i].innerHTML = objectArray[j][properties[i]];
                        }
                    }
                    for (let i = tempCol; i < properties.length; i++) {
                        let col = document.createElement('td');

                        if (properties[i].localeCompare('type')) {
                            col.innerHTML = properties[i] + ' = ' + objectArray[j][properties[i]];
                        } else {
                            col.innerHTML = objectArray[j][properties[i]];
                        }
                        row.appendChild(col);
                    }
                } else { // ie - there are fewer cols now
                    for (let i = 0; i < properties.length; i++) {
                        if (properties[i].localeCompare('type')) {
                            row.children[i].innerHTML = properties[i] + ' = ' + objectArray[j][properties[i]];
                        } else {
                            row.children[i].innerHTML = objectArray[j][properties[i]];
                        }
                    }
                    for (let i = properties.length; i < tempCol; i++) {
                        let tempCol = row.children[i];
                        row.removeChild(tempCol);
                    }
                }
            }
            for (let j = this.prevTotalCount; j < this.totalCount; j++) {
                let row = document.createElement('tr');
                row.id = 'object' + j;
                let properties = Object.keys(objectArray[j].getAttributes());
                for (let i = 0; i < properties.length; i++) {
                    let col = document.createElement('td');
                    if (properties[i].localeCompare('type')) {
                        col.innerHTML = properties[i] + ' = ' + objectArray[j][properties[i]];
                    } else {
                        col.innerHTML = objectArray[j][properties[i]];
                    }
                    row.appendChild(col);
                }
                table.appendChild(row);
            }
        }
    }
}

textInterceptor.prototype.getSummary = function(object1, object2, element) {
        this.prevTotalCount = this.totalCount;
        this.totalCount = object1.objectCount + object2.objectCount;
        element.innerHTML = '';
        element.innerHTML +=
            'Your output is a ' +
            this.canvasDetails.width +
            ' by ' +
            this.canvasDetails.height +
            ' ' +
            this.bgColor +
            ' canvas ' +
            ' containing the following ';
        if (this.totalCount > 1) {
            element.innerHTML += this.totalCount + ' objects : ';
        } else {
            element.innerHTML += this.totalCount + ' object : ';
        }

        if (object2.objectCount > 0 || object1.objectCount > 0) {

            let objectList = document.createElement('ul');

            if (this.totalCount < 100) {

                object1.objectArray.forEach(function(objArrayItem, i) {
                    let objectListItem = document.createElement('li');
                    objectList.appendChild(objectListItem);
                    let objLink = document.createElement('a');
                    objLink.href = '#object' + i;
                    objLink.target = '_self';
                    objLink.innerHTML = objArrayItem['type'];
                    objectListItem.appendChild(objLink);
                    objectListItem.innerHTML +=
                        ' at ' +
                        objArrayItem['location'] +
                        ' covering ' +
                        objArrayItem['area'] +
                        ' of the canvas';
                });

                object2.objectArray.forEach(function(objArrayItem, i) {
                    let objectListItem = document.createElement('li');
                    objectList.appendChild(objectListItem);
                    let objLink = document.createElement('a');
                    objLink.href = '#object' + (i + object1.objectArray.length);
                    objLink.target = '_self';
                    objLink.innerHTML = objArrayItem['type'];
                    objectListItem.appendChild(objLink);
                    objectListItem.innerHTML +=
                        ' at ' +
                        objArrayItem['location'] +
                        ' covering ' +
                        objArrayItem['area'] +
                        ' of the canvas';
                });
                element.appendChild(objectList);
            }
        }
    }
    /*
    const textInterceptor = new textInterceptor();
    */