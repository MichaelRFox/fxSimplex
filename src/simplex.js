/**
 * @module simplex
 * @desc The simplex module provides the entry point for fxSimplex. 
 */

import {trim, testVariable} from './utilities';
import {parseModel} from './model';
import {getPivot, pivotModel} from './pivot';
import {buildPhaseTwoTableau, cleanPhaseTwoTableau} from './phaseTwo';
import {getVariables, swapVariables} from './variables';

/**
 * @function buildSolution
 * @desc Formats the final solution for return back to the [simplex function]{@link module:simplex~simplex}.
 * @param {Array} model A two-dimensional array of numbers representing the
 * current simplex tableau.
 * @param {Array} basicVariables An array of strings representing the basic variables of the tableau.
 * @param {Array} nonBasicVariables An array of strings representing the non-basic variables of the tableau.
 * @param {string} result The result of the final tableau pivot. One of ['solved', 'multiple solutions', 'unbounded']
 * @returns {Object} Key-value pairs representing the solution (a two-dimensional array of variable (string)
 * and coefficient (number) pairs), and the result (string).
 */
function buildSolution (model, basicVariables, nonBasicVariables, result) {

    let solution = [];
    let lastColumn = model[0].length - 1;

    for (let i = 0; i < basicVariables.length; i++) {
        solution.push ([basicVariables[i], trim(model[i][lastColumn])]);
    };

    return {solution: solution, result: result};

}

/**
 * @function executeSimplex
 * @desc Iteratively executes the simplex method for either one-phase or two-phase models until a solution
 * is found or the model is determined to be unbounded.
 * @param {Array} model A two-dimensional array of numbers representing the
 * current simplex tableau.
 * @param {Array} basicVariables An array of strings representing the basic variables of the tableau.
 * @param {Array} nonBasicVariables An array of strings representing the non-basic variables of the tableau.
 * @param {string} type The type of optimization ['min' | 'max'].
 * @returns {Array} An array containing the final tableau (two-dimensional array of numbers) and and object
 * containing key-value pairs representing the final pivot row and column indices. 
 */
function executeSimplex (model, variables, basicVariables, nonBasicVariables, type) {

    let pivot;

    while (true) {
        pivot = getPivot(model, variables, basicVariables, nonBasicVariables, type);
        switch (pivot) {
            case 'solved':
            case 'multiple solutions':
            case 'unbounded':
                return [model, pivot];
        };
        model = pivotModel(model, pivot, type);

        ({basicVariables, nonBasicVariables} = swapVariables(pivot, variables, basicVariables, nonBasicVariables));
    };
};

/**
 * @function simplex
 * @desc The simplex function is the entry point for fxSimplex and is the only object exposed by the library.
 * @param {string} objective The objective function in the form of  *'Maximize Z = 1x + 5y'*.
 * @parm {Array} constraints A two-dimensional array of strings detailing the constraints
 * in the form of *['x + y <= 4', '2x - y <= 7', ...]*.
 * @returns {Object} An object with the solution (an array of key value pairs for the basic variables and their
 * coefficients in the form of *[['y', 10],['x', 10], ['Z', 20],...]*) and a result: a string in the form of
 * *['solved' | 'infeasible' | 'unbounded' | 'multiple solutions']*. If the optimization is successful, the result
 * will be either *solved* or *multiple solutions*, and the solution will contain optimal coefficients. If the
 * result returns *infeasible* or *unbounded*, the optimization has failed and the coefficients returned in the
 * solution will reflect the final tableau reached and not be optimal.
 */
export function simplex (objective, constraints) {
    
    let [model, variables, type] = parseModel (objective, constraints);
    if (model.length == 0) return {solution: [], result: ''};

    let tableau;
    let result;

    model.forEach(row => { /* ensure rhs is positive */
        if (row[row.length - 1] < 0) {
            row.forEach(item => {item *= -1});
        };
    });

    let {basicVariables, nonBasicVariables} = getVariables(model, variables);
    let isTwoPhase = variables.some (variable => {return testVariable(variable, ['a'])});

    if (isTwoPhase) {
        let originalObjective = model.pop(); /* ignore the original objective function for now */
        tableau = buildPhaseTwoTableau (model, variables);
        [tableau, result] = executeSimplex (tableau, variables, basicVariables, nonBasicVariables, 'min');
        if (result == 'unbounded') return buildSolution(tableau, basicVariables, nonBasicVariables, result);
        [tableau, result] = cleanPhaseTwoTableau(tableau, originalObjective, variables, basicVariables, nonBasicVariables);
        if (result == 'infeasible') return buildSolution(tableau, basicVariables, nonBasicVariables, result);
        [tableau, result] = executeSimplex (tableau, variables, basicVariables, nonBasicVariables, type);
    } else {
        [tableau, result] = executeSimplex (model, variables, basicVariables, nonBasicVariables, type);

    };
    
    return buildSolution(tableau, basicVariables, nonBasicVariables, result);        

}