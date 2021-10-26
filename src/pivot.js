/**
 * @module pivot
 * @desc The pivot module provides functions to perform pivoting of the tableau.
 */

import {trim, testVariable, multipleSolutionTest} from './utilities';

/**
 * @function getPivot
 * @desc Determines the appropriate pivot row and column, or if the tableau is in a final state
 * whether the result is one of ['solved' | 'multiple solutions' | 'unbounded'].
 * @param {Array} model A two-dimensional array of numbers representing the
 * current simplex tableau.
 * @param {Array} variables An array of strings representing the variables of the tableau.
 * @param {Array} basicVariables An array of strings representing the basic variables of the tableau.
 * @param {Array} nonBasicVariables An array of strings representing the variables of the tableau.
 * @param {string} type The type of optimization ['min' | 'max'].
 * @returns {(Object | string)} Returns an object with the pivot row and column indices,
 * unless no further pivoting is possible (e.g., all values in the bottom from are >= 0)
 * either ['solved' | 'multiple solutions' | 'unbounded'].
 */
export function getPivot (model, variables, basicVariables, nonBasicVariables, type) {
    
    let pivotColumn;
    let pivotRow = null;
    let minRatio = Number.MAX_VALUE;
    let rowCount = model.length;
    let columnCount = model[0].length;
    let pivotRows = [];

    let objectiveValues = model[rowCount - 1].slice(0, -1).reduce((a, b, i) => {
        return nonBasicVariables.indexOf(variables[i]) != -1 ? a.concat(b) : a}, []);

    objectiveValues = type == 'max' ? 
        objectiveValues.filter(d => {return trim(d) < 0}) : 
        objectiveValues.filter(d => {return trim(d) > 0});

    if (objectiveValues.length == 0) {
        let test = multipleSolutionTest(model, variables, basicVariables, nonBasicVariables);
        return test == false ? 'solved' : 'multiple solutions';
    } else {
        let objectiveValue = objectiveValues[0]; /* Bland's rule to avoid cycling */
        pivotColumn = model[rowCount - 1].indexOf(objectiveValue);
    };

    minRatio = model.reduce((a, b, i) => {
        if (trim(b[pivotColumn]) > 0 & i != rowCount - 1) {
            let ratio = b[columnCount -1] / b[pivotColumn];
            return ratio < a ? ratio : a;
        };
        return a;
    }, minRatio);

    pivotRows = model.reduce((a, b, i) => {
        if (trim(b[pivotColumn]) > 0 & i != rowCount - 1) {
            return b[b.length - 1] / b[pivotColumn] == minRatio ? a.concat(i) : a;
        };
        return a;
    }, []);

    switch (pivotRows.length) {
        case 0: 
            return 'unbounded';
        case 1:
            pivotRow = pivotRows[0];
            break;
        default:
            pivotRows.forEach(row => { /** prioritize alternate variable to leave the basis */
                if (testVariable(basicVariables[row], ['a'])) pivotRow = row;
            });
    };

    pivotRow = pivotRow == null ? pivotRows[0] : pivotRow;

    return {row: pivotRow, column: pivotColumn};
};

/**
 * @function pivotModel
 * @desc Performs the actual pivoting of the tableau.
 * @param {Array} model A two-dimensional array of numbers representing the
 * current simplex tableau.
 * @param {Object} pivot An object with the pivot row and column indices.
 * @returns {Array} The pivoted model.
 */
export function pivotModel (model, pivot) {
    let multiplier;
    let pivotValue = model[pivot.row][pivot.column];
    
    if (pivotValue != 1) { /** matrix operation to transform pivotValue to 1 */
        model[pivot.row].forEach ((value, index) => {
            model[pivot.row][index] = value / pivotValue;
        });
    };

    model.forEach ((row, rowIndex) => {
        if (rowIndex !== pivot.row && row[pivot.column] !== 0) {
            multiplier = -row[pivot.column];
            row.forEach ((value, columnIndex) => {
                model[rowIndex][columnIndex] =  multiplier * model[pivot.row][columnIndex] + model[rowIndex][columnIndex];
            });
        };
    });
    
    return model;
}

