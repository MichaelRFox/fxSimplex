import {trim, testVariable, multipleSolutionTest} from './utilities.js';

export function getPivot (model, variables, basicVariables, nonBasicVariables, type) {
    
    //let currentRatio = null;
    let pivotColumn;
    let pivotRow = null;
    let minRatio = Number.MAX_VALUE;
    let rowCount = model.length;
    let columnCount = model[0].length;
    let pivotRows = [];

    let objectiveValues = model[rowCount - 1].slice(0, -1).reduce((a, b, i) => {
        return nonBasicVariables.indexOf(variables[i]) != -1 ? a.concat(b) : a}, []);
/*
    let objectiveValue = type == 'max' ? 
        Math.min(...objectiveValues) : 
        Math.max(...objectiveValues);
*/
    objectiveValues = type == 'max' ? 
        objectiveValues.filter(d => {return trim(d) < 0}) : 
        objectiveValues.filter(d => {return trim(d) > 0});

    if (objectiveValues.length == 0) {
        let test = multipleSolutionTest(model, variables, basicVariables, nonBasicVariables);
        //if (test == null) return 'solved';
        //pivotColumn = test;
        //return 'solved';
        return test == null ? 'solved' : 'multiple solutions';
    } else {
        let objectiveValue = objectiveValues[0]; //Bland's rule
        pivotColumn = model[rowCount - 1].indexOf(objectiveValue);
    };

/*
    if (trim(objectiveValue) >= 0 && type == 'max') {
        return 'solved';
    } else if (trim(objectiveValue) <= 0 && type != 'max') return 'solved';
*/
/*
    model.forEach ((row, index) =>  {
        if (row[pivotColumn] > 0 && index != rowCount - 1) {
            currentRatio = row[columnCount - 1] / row[pivotColumn];
            if (currentRatio < minRatio) {
                minRatio = currentRatio;
                //pivotRow = index;
            };
        };
    });
*/
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
            pivotRows.forEach(row => { //prioritize alternate variable to leave the basis
                if (testVariable(basicVariables[row], ['a'])) pivotRow = row;
            });
    };

    pivotRow = pivotRow == null ? pivotRows[0] : pivotRow;

    //if (pivotRow == null) return ('unbounded');

    return {row: pivotRow, column: pivotColumn};
};

export function pivotModel (model, pivot) {
    let multiplier;
    let pivotValue = model[pivot.row][pivot.column];
    
    if (pivotValue != 1) { //matrix operation to transform pivotValue to 1
        model[pivot.row].forEach ((value, index) => {
            model[pivot.row][index] = value / pivotValue;
        });
    };

    model.forEach ((row, rowIndex) => {
        if (rowIndex !== pivot.row && row[pivot.column] !== 0) {
//        if (rowIndex !== pivot.row || row[pivot.column] !== 0) {
            multiplier = -row[pivot.column];
            row.forEach ((value, columnIndex) => {
                model[rowIndex][columnIndex] =  multiplier * model[pivot.row][columnIndex] + model[rowIndex][columnIndex];
            });
        };
    });
    
    return model;
}

