funcNames = allData['classitems'].map(x => {
    tempParam = x['overloads'] ? x['overloads'][0]['params'] : x['params'];
    return {
        name: x['name'],
        params: tempParam,
        class: x['class'],
        module: x['module'],
        submodule: x['submodule'],
    };
});

funcNames = funcNames.filter(x => (x['name'] && x['params'] && (x['class'] === 'p5')));

if (document.getElementById('tableOutput-content')) {
    funcNames.forEach(x => {
        // let document = parent.document;
        let originalFunc = p5.prototype[x.name];
        const byID = id => document.getElementById(id);
        let details = byID('tableOutput-content-details');
        let summary = byID('tableOutput-content-summary');
        let table = byID('tableOutput-content-table');

        p5.prototype[x.name] = () => {
            orgArg = arguments;

            if (frameCount == 0) { // for setup
                table.textContent = '';
                details.textContent = '';
                summary.textContent = '';
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
                cells.forEach(cell => cell.textContent = '');

                //concat the new objects and populate the grid
                //TODO : make this more efficient so that it happens only ONCE per frame count
                programObjects = gridInterceptor.setupObject.objectArray.concat(gridInterceptor.drawObject.objectArray);
                gridInterceptor.populateObjectDetails(gridInterceptor.setupObject, gridInterceptor.drawObject, summary, details);
                gridInterceptor.populateTable(programObjects, document);
            }
            if (x.name == 'redraw') { // reset some of the letiables
                gridInterceptor.drawObject = gridInterceptor.clearVariables(gridInterceptor.drawObject);
            }
            return originalFunc.apply(this, arguments);
        };
    });
}