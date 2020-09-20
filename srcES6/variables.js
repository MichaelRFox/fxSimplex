import {testVariable} from './utilities.js';

export function getVariables (model, variables) {

    const prefixCodes = ['s', 'a']; // slack and artifical variables
    const basicVariableCount = variables.reduce((a, b) => {return prefixCodes.indexOf(b.charAt(0)) != -1 ? ++a : a}, 0);
    const lastRow = model.length - 1;
    let zPrefix = variables[variables.length - 1];
    let basicVariables = new Array(basicVariableCount);
    let nonBasicVariables = [];

    model.forEach ((row, index) => {
        row.forEach ((item, column) => {
//            let isValidColumn = prefixCodes.indexOf(variables[column].charAt(0)) != -1;
            let isValidColumn = testVariable(variables[column], prefixCodes);
            let isZcolumn = variables[column] == zPrefix && index == lastRow;
//            let isZcolumn = ['Z', 'W'].indexOf(variables[column]) != -1 && index == lastRow;
            if ((item == 1 && isValidColumn) || isZcolumn) {
                basicVariables[index] = variables[column];
            }; 
        });
    });

    variables.forEach (variable => {
        if (basicVariables.indexOf(variable) == -1) nonBasicVariables.push(variable);
    });

    return {basicVariables: basicVariables, nonBasicVariables: nonBasicVariables};

}

export function swapVariables (pivot, variables, basicVariables, nonBasicVariables) {

    let tmpVariable = basicVariables[pivot.row];
    basicVariables[pivot.row] = variables[pivot.column];
    nonBasicVariables[nonBasicVariables.indexOf(variables[pivot.column])] = tmpVariable;

    return {basicVariables: basicVariables, nonBasicVariables: nonBasicVariables};
}
