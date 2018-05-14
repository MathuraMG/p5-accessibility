funcNames = allData['classitems'].map(function(x) {
    const tempParam = x['overloads'] ? x['overloads'][0]['params'] : x['params'];
    return {
        name: x['name'],
        params: tempParam,
        class: x['class'],
        module: x['module'],
        submodule: x['submodule']
    };
});

funcNames = funcNames.filter(function(x) {
    return (x['name'] && x['params'] && (x['class'] === 'p5'));
});

if (document.getElementById('textOutput-content')) {
    funcNames.forEach(function(x) {
        // var document = parent.document;
        let originalFunc = p5.prototype[x.name];
        let byID = id => document.getElementById(id);
        const details = byID('textOutput-content-details');
        const summary = byID('textOutput-content-summary');
        const table = byID('textOutput-content-table');
        p5.prototype[x.name] = function() {
            if (frameCount == 0) { // for setup
                details.innerHTML = '';
                summary.innerHTML = '';
                textInterceptor.setupObject = textInterceptor.populateObject(x, arguments, textInterceptor.setupObject, table, false);
                textInterceptor.getSummary(textInterceptor.setupObject, textInterceptor.drawObject, summary);
                textInterceptor.populateTable(table, textInterceptor.setupObject.objectArray);
            } else if (frameCount % 20 === 19) {
                if (x.name === 'redraw') { // reset some of the variables
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