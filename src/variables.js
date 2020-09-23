import { testVariable } from './utilities.js';

export function getVariables(model, variables) {
    var prefixCodes = [ 's', 'a' ];
    var basicVariableCount = variables.reduce((function(a, b) {
        return -1 != prefixCodes.indexOf(b.charAt(0)) ? ++a : a;
    }), 0);
    var lastRow = model.length - 1;
    var zPrefix = variables[variables.length - 1];
    var basicVariables = new Array(basicVariableCount);
    var nonBasicVariables = [];
    model.forEach((function(row, index) {
        row.forEach((function(item, column) {
            var isValidColumn = testVariable(variables[column], prefixCodes);
            var isZcolumn = variables[column] == zPrefix && index == lastRow;
            (1 == item && isValidColumn || isZcolumn) && (basicVariables[index] = variables[column]);
        }));
    }));
    variables.forEach((function(variable) {
        -1 == basicVariables.indexOf(variable) && nonBasicVariables.push(variable);
    }));
    return {
        basicVariables: basicVariables,
        nonBasicVariables: nonBasicVariables
    };
}

export function swapVariables(pivot, variables, basicVariables, nonBasicVariables) {
    var tmpVariable = basicVariables[pivot.row];
    basicVariables[pivot.row] = variables[pivot.column];
    nonBasicVariables[nonBasicVariables.indexOf(variables[pivot.column])] = tmpVariable;
    return {
        basicVariables: basicVariables,
        nonBasicVariables: nonBasicVariables
    };
}