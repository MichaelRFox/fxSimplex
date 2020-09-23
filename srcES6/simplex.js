import {trim} from './utilities.js';
import {parseModel} from './model.js';
import {getPivot, pivotModel} from './pivot.js';
import {buildPhaseOneTableau, cleanPhaseOneTableau} from './phaseOne.js';
import {getVariables, swapVariables} from './variables.js';

function buildSolution (model, basicVariables, nonBasicVariables, result) {

    let solution = [];
    let lastColumn = model[0].length - 1;

    for (let i = 0; i < basicVariables.length; i++) {
        solution.push ([basicVariables[i], trim(model[i][lastColumn])]);
    };

    return {solution: solution, result: result};

}

function phaseTwo (model, variables, basicVariables, nonBasicVariables, type) {

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

        swapVariables(pivot, variables, basicVariables, nonBasicVariables);
    };
};

export function simplex (objective, constraints) {
    
    let [model, variables, type] = parseModel (objective, constraints);
    if (model.length == 0) return {solution: [], result: ''};;

    let tableau;
    let result;

    model.forEach(row => { // ensure rhs is positive
        if (row[row.length - 1] < 0) {
            row.forEach(item => {item *= -1});
        };
    });

    let {basicVariables, nonBasicVariables} = getVariables(model, variables);
    let isTwoPhase = variables.some (variable => {return variable.charAt(0) == 'a'});

    if (isTwoPhase) {
        let originalObjective = model.pop();
        tableau = buildPhaseOneTableau (model, variables);
        [tableau, result] = phaseTwo (tableau, variables, basicVariables, nonBasicVariables, 'min');
        if (result == 'unbounded') return buildSolution(tableau, basicVariables, nonBasicVariables, result);
        [tableau, result] = cleanPhaseOneTableau(tableau, originalObjective, variables, basicVariables, nonBasicVariables);
        if (result == 'infeasible') return buildSolution(tableau, basicVariables, nonBasicVariables, result);
        [tableau, result] = phaseTwo (tableau, variables, basicVariables, nonBasicVariables, type);
    } else {
        [tableau, result] = phaseTwo (model, variables, basicVariables, nonBasicVariables, type);

    };
    
    return buildSolution(tableau, basicVariables, nonBasicVariables, result);        

}