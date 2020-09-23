import { getColumn } from './matrix.js';

export function trim(x) {
    var precision = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 7;
    return parseFloat(x.toFixed(precision));
}

export function testVariable(variable, prefixes) {
    var regex = new RegExp('['.concat(prefixes.join(''), ']\\d+'), 'i');
    return null != variable.match(regex);
}

export function multipleSolutionTest(model, variables, basicVariables, nonBasicVariables) {
    var primaryNonBasicVariables = nonBasicVariables.reduce((function(a, b) {
        return false == testVariable(b, [ 's', 'e', 'a' ]) ? a.concat(variables.indexOf(b)) : a;
    }), []);
    if (0 == primaryNonBasicVariables.length) {
        return null;
    }
    var pivotColumns = [];
    primaryNonBasicVariables.forEach((function(index) {
        var column = getColumn(model, index);
        0 == trim(column.slice(-1)[0]) & column.some((function(d) {
            return trim(d) > 0;
        })) && pivotColumns.push(index);
    }));
    return pivotColumns.length > 0 ? pivotColumns[0] : null;
}