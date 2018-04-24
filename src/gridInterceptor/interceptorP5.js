funcNames = allData['classitems'].map(function(x) {
    if (x['overloads']) {
        tempParam = x['overloads'][0]['params'];
    } else {
        tempParam = x['params'];
    }
    return {
        name: x['name'],
        params: tempParam,
        class: x['class'],
        module: x['module'],
        submodule: x['submodule'],
    };
});

funcNames = funcNames.filter(function(x) {
    let className = x['class'];
    return (x['name'] && x['params'] && (className === 'p5'));
});
if (document.getElementById('tableOutput-content')) {
    funcNames.forEach(function(x) {
        // let document = parent.document;
        let originalFunc = p5.prototype[x.name];
        let byID = function(id) {
            let element = document.getElementById(id);
            return element;
        };
        let details = byID('tableOutput-content-details');
        let summary = byID('tableOutput-content-summary');
        let table = byID('tableOutput-content-table');

        p5.prototype[x.name] = function() {
            orgArg = arguments;

            if (frameCount == 0) { // for setup
                table.innerHTML = '';
                details.innerHTML = '';
                summary.innerHTML = '';
                gridInterceptor.createShadowDOMElement(document);
                gridInterceptor.setupObject =
                    gridInterceptor.populateObject(x, arguments, gridInterceptor.setupObject, details, false);
                gridInterceptor.populateObjectDetails(gridInterceptor.setupObject, gridInterceptor.drawObject, summary, details);
                gridInterceptor.populateTable(details, gridInterceptor.setupObject);
            } else if (frameCount == 1 || frameCount % 20 == 0) {
                gridInterceptor.drawObject =
                    gridInterceptor.populateObject(x, arguments, gridInterceptor.drawObject, details, true);
                gridInterceptor.isCleared = false;

                //clean the cells
                let cells = document.getElementsByClassName('gridOutput-cell-content');
                cells = [].slice.call(cells);
                cells.forEach(function(cell) {
                    cell.innerHTML = '';
                });

                //concat the new objects and populate the grid
                //TODO : make this more efficient so that it happens only ONCE per frame count
                programObjects = gridInterceptor.setupObject.objectArray.concat(gridInterceptor.drawObject.objectArray);
                gridInterceptor.populateObjectDetails(gridInterceptor.setupObject, gridInterceptor.drawObject, summary, details);
                gridInterceptor.populateTable(programObjects, document);
            }
            if (x.name == 'redraw') { // reset some of the letiables
                gridInterceptor.drawObject = gridInterceptor.clearletiables(gridInterceptor.drawObject);
            }
            return originalFunc.apply(this, arguments);
        };
    });
}