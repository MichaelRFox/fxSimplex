/**
 * @module model
 * @desc Provides functions to parse the input objective and constraints and build a tableau for processing.
 */

import {testRegex} from './utilities';

 /**
  * @function  parseModel
  * @desc Parses the objective function and the array of constraints into a tableau suitable for processing.
  * @param {string} objective The objective function in the form of  *'Maximize Z = 1x + 5y'*.
  * @param {Array} constraints A two-dimensional array of strings detailing the constraints in the form
  * of *['x + y <= 4', '2x - y <= 7', ...]*.
  * @returns {Array} An array containing the model in the form of a tableau (an n x m array of coefficients),
  * the variable names (an array of strings), and the type (string) ['max' | 'min'].
  */
export function parseModel (objective, constraints) {

    if (objective == '' | constraints.length == 0) return [[], '', ''];
    let modelVariables = [];
    let modelCoeficients = [];
    let modelConstraints = [];
    let modelEqualities = [];

    /** group 1 = max or min; group 2 = Z; group 3 = equation */
    const objectiveRegex = /(max|min)(?:.*\s*)(\w)(?:\s*=) ((?:\s*[+-]?\s*\d*\.*\d*\w\d*)+)/i;

    /** group 1 = elements; group 2 = equality; group 3 = constraint */
    const constraintRegex = /((?:\s*[+-]?\s*\d*\.*\d*\w\d*)+)\s*(=|<=|>=)\s*(\d+)/i;

    if (testRegex(objective, objectiveRegex, 'objective') == false) return [[], '', ''];
    let constraintTest = constraints.every (x => testRegex(x, constraintRegex, 'constraint'));
    if (constraintTest == false) {return [[], '', '']};

    let [regexResult, type, objectiveVariable, objectiveEquation] = objective.match(objectiveRegex);
    type = type.toLowerCase();
    let [objectiveCoeficients, objectiveVariables] = parseEquation(objectiveEquation);

    constraints.forEach (d => {
        let [regexResult, equation, equality, constraint] = d.match(constraintRegex);
        modelConstraints.push(parseFloat(constraint));
        modelEqualities.push(equality);
        let [constraintCoeficients, constraintVariables] = parseEquation(equation);
        modelVariables.push(constraintVariables);
        modelCoeficients.push(constraintCoeficients);
    });
    modelVariables.push(objectiveVariables);
    modelCoeficients.push(objectiveCoeficients);
    modelConstraints.push(0); 

    let [model, variables] = buildTableau(modelVariables, modelCoeficients, modelConstraints, modelEqualities, objectiveVariable, type);

    return [model, variables, type];
};

/**
 * @function parseEquation
 * @desc Parses each constraint equation separably into their coefficients and variables.
 * @param {string} equation An individual constraint equation in the form of `'x + y <= 4'`.
 * @returns {Array} An array consisting of two arrays: an array of coefficients (strings)
 * and an array of variables (strings).
 */
function parseEquation (equation) {
    
    /** matches single element */
    const elementRegex = /\s*[+-]?\s*\d*\.*\d*\w\d*/g;

    /* group 1 = sign; group 2 = coefficient; group 3 = variable */
    const coeficentRegex = /\s*([+-]?)\s*(\d*\.*\d*)(\w\d*)/;

    let coeficients = [];
    let variables = [];

    let elements = [...equation.matchAll(elementRegex)];

    elements.forEach(element => {
        let [regexResult, sign, coeficient, variable] = element[0].match(coeficentRegex);
        coeficient = coeficient == '' ? 1 : coeficient;
        coeficients.push(parseFloat(sign + coeficient));
        variables.push(variable);
    });

    return [coeficients, variables];
}

/**
 * @function buildTableau
 * @desc Builds a tableau suitable for executing the simplex method.
 * @param {Array} variables An array of strings representing the variables (eg., ['x1, 'y1', ...]).
 * @param {Array} coefficients A two-dimensional array of numbers representing the coefficients
 * of the variables on the left hand side of the constraint equations and the right hand
 * side of the objective function (e.g., [[3, 4.5, 7, ...], [1, 17, 8, ...], [12, 11, 2.2, ...]]).
 * @param {Array} constraints An array of numbers representing the constraint values on the right
 * hand side of the constraint equation (e.g., [8, 2.1, 45, ...]).
 * @param {Array} equalities An array of strings representing the constraint operators (e.g.,
 * ['=', '<=', '>=', ...]).
 * @param {string} objectiveVariable A string representing the objective variable name for the
 * left hand side of the objective function.
 * @param {string} type The type of optimization ['min' | 'max'].
 * @returns {Array} A two-dimensional array containing the simplex tableau (a two-dimensional array
 * of numbers) and the model variables. For a model with a <= type a positive *slack* variable is
 * added. For a >= type a negative *extra* and positive *artificial* variables are added. For an =
 * type model a positive *artificial* variable is added.
 */
function buildTableau(variables, coeficients, constraints, equalities, objectiveVariable, type) {
  
    let model = [];

    let uniqueVariables = [... new Set(variables.reduce((a,b) => {return a.concat(b)}, []))];

    coeficients.forEach((coeficient, row) => {
        let tmp = Array.apply(null, Array(uniqueVariables.length)).map(Number.prototype.valueOf,0);
        coeficient.forEach((item, index) => {
            let pos = uniqueVariables.indexOf(variables[row][index]);
            tmp[pos] = row == coeficients.length - 1 ? -item : item;
        });
        model.push(tmp);
    });

    let slackVariableCount = equalities.reduce((a, b) => {return b == '<=' ? ++a : a}, 0);
    let extraVariableCount = equalities.reduce((a, b) => {return b == '>=' ? ++a : a}, 0);
    let alternateVariableCount = equalities.reduce((a, b) => {return b == '>=' || b == '=' ? ++a : a}, 0);
    
    for (let i = 0; i < slackVariableCount; i++) {uniqueVariables.push('s' + i)};
    for (let i = 0; i < extraVariableCount; i++) {uniqueVariables.push('e' + i)};
    for (let i = 0; i < alternateVariableCount; i++) {uniqueVariables.push('a' + i)};
    uniqueVariables.push(objectiveVariable);

    let totalNewVariableCount = uniqueVariables.length - model[0].length;
    let tmp = Array.apply(null, Array(totalNewVariableCount)).map(Number.prototype.valueOf,0);;
    model.forEach(row => {row.push(...tmp)});

    let lePositions = equalities.reduce((a,b,i) =>{return b == '<=' ? a.concat(i) : a},[]);
    lePositions.forEach((row, index) => {
        let column = uniqueVariables.indexOf('s' + index);
        model[row][column] = 1;
    });

    let aPositions = equalities.reduce((a,b,i) =>{return b == '>=' || b == '=' ? a.concat(i) : a},[]);
    aPositions.forEach((row, index) => {
        let column = uniqueVariables.indexOf('a' + index);
        model[row][column] = 1;
    });

    let gePositions = equalities.reduce((a,b,i) =>{return b == '>=' ? a.concat(i) : a},[]);
    gePositions.forEach((row, index) => {
        let column = uniqueVariables.indexOf('e' + index);
        model[row][column] = -1;
    });

    model.forEach ((row, index) => {
        row[row.length - 1] = constraints[index];
    });

    return [model, uniqueVariables];

}