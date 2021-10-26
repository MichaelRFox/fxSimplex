/**
 * @module variables
 * @desc Provides utilities to extract basing and non-basic variables from
 * the model and to swap variables in and out of the basis.
 */

import {testVariable} from './utilities';

/**
 * @function getVariables
 * @desc Parses out the basic and non-basic variables from the simplex tableau.
 * @param {Array} model A two-dimensional array of numbers representing the
 * current simplex tableau
 * @param {Array} variables An array of strings representing the variables of the tableau.
 * @returns {Object} An object with and array (strings) of the basic variables and an
 * array (strings) of the non-basic variables.
 */
export function getVariables (model, variables) {

    const prefixCodes = ['s', 'a']; /** slack and artificial variables */

    const basicVariableCount = variables.reduce((a, b) => { /** get the number of artificial variables in the basis */
        return testVariable(b, prefixCodes) ? ++a : a}, 0);

    const lastRow = model.length - 1;
    let zPrefix = variables[variables.length - 1];
    let basicVariables = new Array(basicVariableCount);
    let nonBasicVariables = [];

    model.forEach ((row, index) => {
        row.forEach ((item, column) => {
            let isValidColumn = testVariable(variables[column], prefixCodes);
            let isZcolumn = variables[column] == zPrefix && index == lastRow;
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

/**
 * @function swapVariables
 * @desc Swaps the basic variable indicated by the pivot row out of the basis with the non-basic
 * variable indicted by the pivot column into the basis.
 * @param {Object} pivot Key value pairs holding the current pivot row and column indices.
 * @param {Array} variables An array of strings representing all of the variables in the tableau.
 * @param {Array} basicVariables An array of strings representing all of the basic variables in the tableau.
 * @param {Array} nonBasicVariables An array of strings representing all of the non-basic variables in the tableau.
 * @returns {Object} Key-value pairs of the basic and non-basic variables (arrays of strings) after swapping.
 */
export function swapVariables (pivot, variables, basicVariables, nonBasicVariables) {

    let tmpVariable = basicVariables[pivot.row];
    basicVariables[pivot.row] = variables[pivot.column];
    nonBasicVariables[nonBasicVariables.indexOf(variables[pivot.column])] = tmpVariable;

    return {basicVariables: basicVariables, nonBasicVariables: nonBasicVariables};
}
