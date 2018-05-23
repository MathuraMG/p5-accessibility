/* global funcNames */
/* global allData */
funcNames = allData.classitems.map((x) => {
    if (x.overloads) {
        /* global tempParam */
        tempParam = x.overloads[0].params;
    } else {
        tempParam = x.params;
    }
    return {
        name: x.name,
        params: tempParam,
        class: x[`class`],
        module: x.module,
        submodule: x.submodule,
    };
});

funcNames = funcNames.filter((x) => {
    const className = x[`class`];
    return (x.name && x.params && (className === `p5`));
});
if (document.getElementById(`tableOutput-content`)) {
    funcNames.forEach((x) => {
        // var document = parent.document;
        const originalFunc = p5.prototype[x.name];
        const byID = function(id) {
            const element = document.getElementById(id);
            return element;
        };
        const details = byID(`tableOutput-content-details`);
        const summary = byID(`tableOutput-content-summary`);
        const table = byID(`tableOutput-content-table`);
        /* global p5 */
        p5.prototype[x.name] = function() {
            /* global orgArg */
            orgArg = arguments;

            if (frameCount === 0) { // for setup
                table.innerHTML = ``;
                details.innerHTML = ``;
                summary.innerHTML = ``;
                /* global gridInterceptor */
                gridInterceptor.createShadowDOMElement(document);
                gridInterceptor.setupObject =
                    gridInterceptor.populateObject(x, arguments, gridInterceptor.setupObject, details, false);
                gridInterceptor.populateObjectDetails(gridInterceptor.setupObject, gridInterceptor.drawObject, summary, details);
                gridInterceptor.populateTable(details, gridInterceptor.setupObject);
            } else if (frameCount === 1 || frameCount % 20 === 0) {
                gridInterceptor.drawObject =
                    gridInterceptor.populateObject(x, arguments, gridInterceptor.drawObject, details, true);
                gridInterceptor.isCleared = false;

                //clean the cells
                let cells = document.getElementsByClassName(`gridOutput-cell-content`);
                cells = [].slice.call(cells);
                cells.forEach((cell) => {
                    cell.innerHTML = ``;
                });

                //concat the new objects and populate the grid
                //TODO : make this more efficient so that it happens only ONCE per frame count
                /* global programObjects */
                programObjects = gridInterceptor.setupObject.objectArray.concat(gridInterceptor.drawObject.objectArray);
                gridInterceptor.populateObjectDetails(gridInterceptor.setupObject, gridInterceptor.drawObject, summary, details);
                gridInterceptor.populateTable(programObjects, document);
            }
            if (x.name === `redraw`) { // reset some of the variables
                gridInterceptor.drawObject = gridInterceptor.clearVariables(gridInterceptor.drawObject);
            }
            return originalFunc.apply(this, arguments);
        };
    });
}