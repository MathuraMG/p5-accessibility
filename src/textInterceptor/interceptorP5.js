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
        submodule: x.submodule
    };
});

funcNames = funcNames.filter((x) => {
    const className = x[`class`];
    return (x.name && x.params && (className === `p5`));
});

if (document.getElementById(`textOutput-content`)) {
    funcNames.forEach((x) => {
        // var document = parent.document;
        /* global p5 */
        const originalFunc = p5.prototype[x.name];
        const byID = function(id) {
            const element = document.getElementById(id);
            return element;
        };
        const details = byID(`textOutput-content-details`);
        const summary = byID(`textOutput-content-summary`);
        const table = byID(`textOutput-content-table`);
        p5.prototype[x.name] = function() {
            /* global orgArg */
            orgArg = arguments;
            if (frameCount === 0) { // for setup
                details.innerHTML = ``;
                summary.innerHTML = ``;
                /* global textInterceptor */
                textInterceptor.setupObject = textInterceptor.populateObject(x, arguments, textInterceptor.setupObject, table, false);
                textInterceptor.getSummary(textInterceptor.setupObject, textInterceptor.drawObject, summary);
                textInterceptor.populateTable(table, textInterceptor.setupObject.objectArray);
            } else if (frameCount % 20 === 19) {
                if (x.name === `redraw`) { // reset some of the variables
                    textInterceptor.drawObject = textInterceptor.clearVariables(textInterceptor.drawObject);
                }
            } else if (frameCount === 1 || frameCount % 20 === 0) {
                textInterceptor.drawObject = textInterceptor.populateObject(x, arguments, textInterceptor.drawObject, details, true);
                textInterceptor.getSummary(textInterceptor.setupObject, textInterceptor.drawObject, summary);
                textInterceptor.populateTable(
                    table, textInterceptor.setupObject.objectArray.concat(textInterceptor.drawObject.objectArray));
            }
            return originalFunc.apply(this, arguments);
        };
    });

}