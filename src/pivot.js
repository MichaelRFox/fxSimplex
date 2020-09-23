import { trim, testVariable, multipleSolutionTest } from './utilities.js';

export function getPivot(model, variables, basicVariables, nonBasicVariables, type) {
    var pivotColumn;
    var pivotRow = null;
    var minRatio = Number.MAX_VALUE;
    var rowCount = model.length;
    var columnCount = model[0].length;
    var pivotRows = [];
    var objectiveValues = model[rowCount - 1].slice(0, -1).reduce((function(a, b, i) {
        return -1 != nonBasicVariables.indexOf(variables[i]) ? a.concat(b) : a;
    }), []);
    objectiveValues = 'max' == type ? objectiveValues.filter((function(d) {
        return trim(d) < 0;
    })) : objectiveValues.filter((function(d) {
        return trim(d) > 0;
    }));
    if (0 == objectiveValues.length) {
        var test = multipleSolutionTest(model, variables, basicVariables, nonBasicVariables);
        return null == test ? 'solved' : 'multiple solutions';
    }
    var objectiveValue = objectiveValues[0];
    pivotColumn = model[rowCount - 1].indexOf(objectiveValue);
    minRatio = model.reduce((function(a, b, i) {
        if (trim(b[pivotColumn]) > 0 & i != rowCount - 1) {
            var ratio = b[columnCount - 1] / b[pivotColumn];
            return ratio < a ? ratio : a;
        }
        return a;
    }), minRatio);
    pivotRows = model.reduce((function(a, b, i) {
        return trim(b[pivotColumn]) > 0 & i != rowCount - 1 && b[b.length - 1] / b[pivotColumn] == minRatio ? a.concat(i) : a;
    }), []);
    switch (pivotRows.length) {
      case 0:
        return 'unbounded';

      case 1:
        pivotRow = pivotRows[0];
        break;

      default:
        pivotRows.forEach((function(row) {
            testVariable(basicVariables[row], [ 'a' ]) && (pivotRow = row);
        }));
    }
    pivotRow = null == pivotRow ? pivotRows[0] : pivotRow;
    return {
        row: pivotRow,
        column: pivotColumn
    };
}

export function pivotModel(model, pivot) {
    var multiplier;
    var pivotValue = model[pivot.row][pivot.column];
    1 != pivotValue && model[pivot.row].forEach((function(value, index) {
        model[pivot.row][index] = value / pivotValue;
    }));
    model.forEach((function(row, rowIndex) {
        if (rowIndex !== pivot.row && 0 !== row[pivot.column]) {
            multiplier = -row[pivot.column];
            row.forEach((function(value, columnIndex) {
                model[rowIndex][columnIndex] = multiplier * model[pivot.row][columnIndex] + model[rowIndex][columnIndex];
            }));
        }
    }));
    return model;
}