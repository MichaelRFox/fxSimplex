/**
 * @module utilities
 * @desc The utilities module provides various helper functions for the fxSimplex library.
 */
import {getColumn} from './matrix';

/**
 * @function trim
 * @desc Helps to avoid floating point errors.
 * @param {number} x The number to trim.
 * @param {number} precision The number of digits to return - optional. **Default**: 7.
 * @returns {number} The trimmed number.
 */
export function trim (x, precision = 7) {
    return parseFloat(x.toFixed(precision));
}

/**
 * @function testVariable
 * @desc Tests a variable against an array of prefixes to determine if the variable starts with the prefix.
 * @param {string} variable A variable in the form of x1 y2, z3, etc.
 * @param {Array} prefixes An array (of strings) of prefixes (e.g., ['a','e'] ) against which to see if the variable matches.
 * @returns {boolean} Whether the variable matches one of the supplied prefixes.
 */
export function testVariable (variable, prefixes) {
    let regex = new RegExp(`[${prefixes.join('')}]\\d+`, 'i');
    return variable.match(regex) != null;
}

/**
 * @function testRegex
 * @desc Tests the result of a regex match to ensure that the input is of the proper formatting
 * and that no reserved variables (e.g., s1, e1, a1) have been used.
 * @param {string} input The original string matched by the regex.
 * @param {string} testRegex The regex to test for matches - if this returns null the statement
 * is improperly formatted.
 * @param {string} type The type of input ['constraint' | 'objective'].
 * @result {boolean} Returns true if the regex match is not null (complete match), and none of
 * the reserved variables are used. False otherwise - logs an error to the console.
 * @since v2.0.0
 */
export function testRegex (input, testRegex, type) {
    
    const regex = /\b(?:\d*\.*\d*)([a|e|s]{1}\d*)\b/g;
    const badVariables = Array.from(input.matchAll(regex), d => d[1]).join(', ');
    const match = input.match(testRegex);
    if (match != null && badVariables == '') return true;

    if (match == null) console.error(`The ${type} ${input} is not in the proper format for an ${type} statement.`);
    if (badVariables != '') console.error(`The following variable(s) are reserved: ${badVariables}.`);

    return false;
}

/**
 * @function multipleSolutionTest
 * @desc Tests whether the computed model has multiple solutions
 * @param {Array} model The simplex tableau.
 * @param {Array} variables An array of variable names (strings) corresponding to the tableau.
 * @param {Array} basicVariables An array of variable names (strings) of those variables
 * corresponding to the basis.
 * @param {Array} nonBasicVariables An array of variable names (strings) of those variables
 * corresponding to those not in the basis.
 * @returns {boolean} Returns true if the there are multiple solutions, false otherwise.
 */
export function multipleSolutionTest(model, variables, basicVariables, nonBasicVariables) {

    let primaryNonBasicVariables = nonBasicVariables.reduce((a, b) => {
        return testVariable(b, ['s', 'e', 'a']) == false ? 
        a.concat(variables.indexOf(b)) : a;
    }, []);

    if (primaryNonBasicVariables.length == 0) return false;

    let pivotColumns = [];

    primaryNonBasicVariables.forEach (index => {
        let column = getColumn(model, index);
        if (trim(column.slice(-1)[0]) == 0 & column.some(d => trim(d) > 0)) {
            pivotColumns.push(index);
        };
    });
   
    return pivotColumns.length > 0 ?true : false;

};