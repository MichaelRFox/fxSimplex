/**
 * @module phaseTwo
 * @desc The phaseTwo module provides functions to build and clean a tableau for the
 * first phase of the two-phased simplex method.
 */

import {trim, testVariable} from './utilities';

/**
 * @function buildPhaseTwoTableau
 * @desc Builds a tableau by creating an objective function that will
 * minimize the artificial variables.
 * @param {Array} model A two-dimensional array representing the original
 * tableau minus the objective function.
 * @param {Array} variables An array of strings representing the variables of the tableau.
 * @returns {Array} A tableau with the artificial variables minimized.
 */
export function buildPhaseTwoTableau (model, variables) {

    let objectiveRow = [];
    let alternativeRows = [];
    let phaseTwoTableau = [];

    model.forEach (row => {
        phaseTwoTableau.push(row);
    });
    
    variables.forEach (variable => { /** create an objective to minimize artificial variables */
        objectiveRow.push(testVariable(variable, ['a']) ? -1 : 0);
    });

    phaseTwoTableau.forEach (row => {
        for (let index = 0; index < row.length; index++) {
             if (testVariable(variables[index], ['a']) && row[index] == 1) {
                alternativeRows.push(row);
                break;           
            };
        };
    });

    alternativeRows.forEach (row => { /** add columns to zero out artificial variables in objective */
        row.forEach((item, index) => {
            objectiveRow[index] += item;
        });
    });

    phaseTwoTableau.push(objectiveRow);

    return phaseTwoTableau;

}

/**
 * @function reBaseModel
 * @desc Returns the model to canonical form.
 * @param {Array} model A two-dimensional array of numbers representing the
 * current simplex tableau.
 * @param {Array} variables An array of strings representing the variables of the tableau.
 * @param {Array} basicVariables An array of strings representing the basic variables of the tableau.
 * @returns {Array} A two-dimensional array with the rebased model.
 */
export function reBaseModel (model, variables, basicVariables) {

    let objectiveRow = model[model.length -1];
    let changedRows = [];

    variables.forEach ((variable, index) => {
        let row = basicVariables.indexOf(variable);
        if (row != -1 && trim(objectiveRow[index]) != 0) {
            changedRows.push(model[row].map(item => {return item * -objectiveRow[index]}));
        };
    });

    changedRows.forEach(row => {
        row.forEach((item, index) => {
            model[model.length - 1][index] += item;
        });
    });

    return model;
};

/**
 * @function cleanPhaseTwoTableau
 * @desc Tests the tableau for infeasibility and cleans out artificial variables from the basis.
 * @param {Array} model A two-dimensional array of numbers representing the
 * current simplex tableau.
 * @param {Array} objective The original objective function.
 * @param {Array} variables An array of strings representing the variables of the tableau.
 * @param {Array} basicVariables An array of strings representing the basic variables of the tableau.
 * @param {Array} nonBasicVariables An array of strings representing the variables of the tableau.
 * @returns {(Array | string)} If the model cannot be solved returns 'infeasible'. Otherwise a
 * two-dimensional array with the cleaned model and an empty string.
 */

export function cleanPhaseTwoTableau (model, objective, variables, basicVariables, nonBasicVariables) {

    let lastRow = model.length - 1;
    let lastColumn = model[0].length - 1;
    if (trim(model[lastRow][lastColumn]) > 0) { /** case 1 */
       return [model, 'infeasible']; 
    };
    
    model.push(objective); /** temporarily return original objective */

    let columnsToRemove = variables.reduce((a, b, i) => { /** determine which columns to remove */
        return testVariable(b, ['a']) && basicVariables.indexOf(b) == -1 ?
            a.concat(i) : a}, []).reverse();

    model.forEach (row => { /** remove the columns from the tableau */
        columnsToRemove.forEach(column => {
            row.splice(column, 1);
        });
    });

    let basicVariableCount = basicVariables.reduce((a, b) => { /** get the number of artificial variables in the basis */
        return testVariable(b, ['a']) ? ++a : a}, 0);

    let phaseOneObjective = model.splice(lastRow, 1)[0]; /** remove and save phase one objective */

/** @todo
    // if (basicVariableCount != 0) { //case 3
    //     model.forEach(row => { // remove columns with negative values in the phase one solution
    //         row.forEach((item, index) => {
    //             if (trim(phaseOneObjective[index]) < 0) {
    //                 row.splice(index, 1);
    //             };
    //         });
    //     });
    //     phaseOneObjective.forEach((item, index) => {
    //         if (trim(item) < 0) {columnsToRemove.push(index)};
    //     });
    // };
*/

    columnsToRemove.forEach(column => { /** remove the corresponding  variables */
        variables.splice(column, 1);
    });

    let indexes = nonBasicVariables.reduce((a, b, i) => { /** remove the corresponding non-basic variables */
        return testVariable(b, ['a']) ? a.concat(i) : a}, []).reverse();
    indexes.forEach (index => {nonBasicVariables.splice(index, 1)});
    
    model = reBaseModel(model, variables, basicVariables);
    
    return [model, ''];

}
