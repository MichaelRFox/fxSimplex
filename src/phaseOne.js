import { trim, testVariable } from './utilities.js';

export function buildPhaseOneTableau(model, variables) {
    var objectiveRow = [];
    var alternativeRows = [];
    var phaseOneTableau = [];
    model.forEach((function(row) {
        phaseOneTableau.push(row);
    }));
    variables.forEach((function(variable) {
        objectiveRow.push(testVariable(variable, [ 'a' ]) ? -1 : 0);
    }));
    phaseOneTableau.forEach((function(row) {
        for (var index = 0; index < row.length; index++) {
            if (testVariable(variables[index], [ 'a' ]) && 1 == row[index]) {
                alternativeRows.push(row);
                break;
            }
        }
    }));
    alternativeRows.forEach((function(row) {
        row.forEach((function(item, index) {
            objectiveRow[index] += item;
        }));
    }));
    phaseOneTableau.push(objectiveRow);
    return phaseOneTableau;
}

export function reBaseModel(model, variables, basicVariables) {
    var objectiveRow = model[model.length - 1];
    var changedRows = [];
    variables.forEach((function(variable, index) {
        var row = basicVariables.indexOf(variable);
        -1 != row && 0 != trim(objectiveRow[index]) && changedRows.push(model[row].map((function(item) {
            return item * -objectiveRow[index];
        })));
    }));
    changedRows.forEach((function(row) {
        row.forEach((function(item, index) {
            model[model.length - 1][index] += item;
        }));
    }));
    return model;
}

export function cleanPhaseOneTableau(model, objective, variables, basicVariables, nonBasicVariables) {
    var lastRow = model.length - 1;
    var lastColumn = model[0].length - 1;
    if (trim(model[lastRow][lastColumn]) > 0) {
        return [ model, 'infeasible' ];
    }
    model.push(objective);
    var columnsToRemove = variables.reduce((function(a, b, i) {
        return testVariable(b, [ 'a' ]) && -1 == basicVariables.indexOf(b) ? a.concat(i) : a;
    }), []).reverse();
    model.forEach((function(row) {
        columnsToRemove.forEach((function(column) {
            row.splice(column, 1);
        }));
    }));
    var basicVariableCount = basicVariables.reduce((function(a, b) {
        return testVariable(b, [ 'a' ]) ? ++a : a;
    }), 0);
    var phaseOneObjective = model.splice(lastRow, 1)[0];
    columnsToRemove.forEach((function(column) {
        variables.splice(column, 1);
    }));
    var indexes = nonBasicVariables.reduce((function(a, b, i) {
        return testVariable(b, [ 'a' ]) ? a.concat(i) : a;
    }), []).reverse();
    indexes.forEach((function(index) {
        nonBasicVariables.splice(index, 1);
    }));
    model = reBaseModel(model, variables, basicVariables);
    return [ model, '' ];
}