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
        submodule: x['submodule']
    };
});

funcNames = funcNames.filter(function(x) {
    var className = x['class'];
    return (x['name'] && x['params'] && (className === 'p5'));
});

if (document.getElementById('textOutput-content')) {
    funcNames.forEach(function(x) {
        // var document = parent.document;
        var originalFunc = p5.prototype[x.name];
        var byID = function(id) {
            var element = document.getElementById(id);
            return element;
        };
        var details = byID('textOutput-content-details');
        var summary = byID('textOutput-content-summary');
        var table = byID('textOutput-content-table');
        p5.prototype[x.name] = function() {
            orgArg = arguments;
            if (frameCount == 0) { // for setup
                details.innerHTML = '';
                summary.innerHTML = '';
                textInterceptor.setupObject = textInterceptor.populateObject(x, arguments, textInterceptor.setupObject, table, false);
                textInterceptor.getSummary(textInterceptor.setupObject, textInterceptor.drawObject, summary);
                textInterceptor.populateTable(table, textInterceptor.setupObject.objectArray);
            } else if (frameCount % 20 == 19) {
                if (x.name == 'redraw') { // reset some of the variables
                    textInterceptor.drawObject = textInterceptor.clearVariables(textInterceptor.drawObject);
                }
            } else if (frameCount == 1 || frameCount % 20 == 0) {
                textInterceptor.drawObject = textInterceptor.populateObject(x, arguments, textInterceptor.drawObject, details, true);
                textInterceptor.getSummary(textInterceptor.setupObject, textInterceptor.drawObject, summary);
                textInterceptor.populateTable(
                    table, textInterceptor.setupObject.objectArray.concat(textInterceptor.drawObject.objectArray));
            }
            return originalFunc.apply(this, arguments);
        };
    });

}