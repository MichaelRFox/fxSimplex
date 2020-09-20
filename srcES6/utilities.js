import {getColumn} from './matrix.js';

export function trim (x, precision = 7) {

    return parseFloat(x.toFixed(precision));

}

export function testVariable (variable, prefixes) {

    let regex = new RegExp(`[${prefixes.join('')}]\\d+`, 'i');
    return variable.match(regex) != null;
}

export function multipleSolutionTest(model, variables, basicVariables, nonBasicVariables) {

    let primaryNonBasicVariables = nonBasicVariables.reduce((a, b) => {
        return testVariable(b, ['s', 'e', 'a']) == false ? 
        a.concat(variables.indexOf(b)) : a;
    }, []);

    if (primaryNonBasicVariables.length == 0) return null;

    let pivotColumns = [];

    primaryNonBasicVariables.forEach (index => {
        let column = getColumn(model, index);
        if (trim(column.slice(-1)[0]) == 0 & column.some(d => trim(d) > 0)) {
            pivotColumns.push(index);
        };
    });
   
    return pivotColumns.length > 0 ? pivotColumns[0] : null;

};