import test from 'tape';
import {getVariables, swapVariables} from '../../src/variables.js';

test('Get variables test', function(t) {

    let model = [[2, 3, 1, 0, 12],
                [2, 1, 0, 1, 8],
                [-3, -2, 0, 0, 0]];

    let variables = ["x", "y", "s0", "s1", "P"];

    let expected = {basicVariables: ["s0", "s1", "P"], nonBasicVariables: ["x", "y"]};
    let actual = getVariables (model, variables);
    t.deepEqual(actual, expected);
    t.end();
});

test('Swap variables test', function(t) {


    let variables = ["x1", "x2", "e0", "e1", "a0", "a1", "P"];
    let basicVariables = ["a0", "a1", "P"];
    let nonBasicVariables = ["x1", "x2", "e0", "e1"];
    let pivot = {row: 1, column: 1};

    let expected = {basicVariables: ["a0", "x2", "P"], nonBasicVariables: ["x1", "a1", "e0", "e1"]};
    let actual = swapVariables (pivot, variables, basicVariables, nonBasicVariables);
    t.deepEqual(actual, expected);
    t.end();
});