import {trim, testVariable} from './utilities.js';

export function buildPhaseOneTableau (model, variables) {

    let objectiveRow = [];
    let alternativeRows = [];
    let phaseOneTableau = [];

    model.forEach (row => {
        phaseOneTableau.push(row);
    });
    
    variables.forEach (variable => { // create an objective to minimize alternative variables
//        let char = variable.charAt(0);
//        objectiveRow.push(char == 'a' ? -1 : 0);
        objectiveRow.push(testVariable(variable, ['a']) ? -1 : 0);
    });

    phaseOneTableau.forEach (row => {
        for (let index = 0; index < row.length; index++) {
//             if (variables[index].charAt(0) == 'a' && row[index] == 1) {
             if (testVariable(variables[index], ['a']) && row[index] == 1) {
                alternativeRows.push(row);
                break;           
            };
        };
    });

    alternativeRows.forEach (row => { // add columns to zero out alterntive varaibles in objective
        row.forEach((item, index) => {
            objectiveRow[index] += item;
        });
    });

    phaseOneTableau.push(objectiveRow);

    return phaseOneTableau;

}

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

export function cleanPhaseOneTableau (model, objective, variables, basicVariables, nonBasicVariables) {

    let lastRow = model.length - 1;
    let lastColumn = model[0].length - 1;
    if (trim(model[lastRow][lastColumn]) > 0) { // case 1
       return [model, 'infeasible']; 
    };
    
    model.push(objective); // return original objective for phase two

    let columnsToRemove = variables.reduce((a, b, i) => {
//        return b.charAt(0) == 'a' && basicVariables.indexOf(b) == -1 ?
        return testVariable(b, ['a']) && basicVariables.indexOf(b) == -1 ?
            a.concat(i) : a}, []).reverse();

    model.forEach (row => {
        columnsToRemove.forEach(column => {
            row.splice(column, 1);
        });
    });

    let basicVariableCount = basicVariables.reduce((a, b) => {
//        return b.charAt(0) == 'a' ? ++a : a}, 0);
        return testVariable(b, ['a']) ? ++a : a}, 0);

    let phaseOneObjective = model.splice(lastRow, 1)[0]; //remove and save phase one objective
/*
    if (basicVariableCount != 0) { //case 3
        model.forEach(row => { // remove columns with negative values in the phase one solution
            row.forEach((item, index) => {
                if (trim(phaseOneObjective[index]) < 0) {
                    row.splice(index, 1);
                };
            });
        });
        phaseOneObjective.forEach((item, index) => {
            if (trim(item) < 0) {columnsToRemove.push(index)};
        });
    };
*/    
    columnsToRemove.forEach(column => { //clean up variables
        variables.splice(column, 1);
    });

    let indexes = nonBasicVariables.reduce((a, b, i) => {
//        return b.charAt(0) == 'a' ? a.concat(i) : a}, []).reverse();
        return testVariable(b, ['a']) ? a.concat(i) : a}, []).reverse();
    indexes.forEach (index => {nonBasicVariables.splice(index, 1)});
    
    model = reBaseModel(model, variables, basicVariables);
    
    return [model, ''];

}
