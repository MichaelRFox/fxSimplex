import test from 'tape';
import {buildPhaseOneTableau, reBaseModel, cleanPhaseOneTableau} from '../../srcES6/phaseOne.js';

test('Build phase one test', function(t) {

    let model = [[4, 1, 1, 0, 0, 1, 30],
                [2, 3, 1, 1, 0, 0, 60],
                [1, 2, 3, 0, 1, 0, 40]];
    let variables = ["x1", "x2", "x3", "s0", "s1", "a0", "Z"];

    let expected = [[4, 1, 1, 0, 0, 1, 30],
                    [2, 3, 1, 1, 0, 0, 60],
                    [1, 2, 3, 0, 1, 0, 40],
                    [4, 1, 1, 0, 0, 0, 30]];

    let actual = buildPhaseOneTableau (model, variables);
    t.deepEqual(actual, expected);
    t.end();
});

test('Clean phase one tableau test', function(t) {

    let model = [[1, 0.25, 0.25, 0, 0, 0.25, 7.5],
                [0, 2.5, 0.5, 1, 0, -0.5, 45],
                [0, 1.75, 2.75, 0, 1, -0.25, 32.5],
                [0, 0, 0, 0, 0, -1, 0]];
    let originalObjective = [-3, -2, -1, 0, 0, 0, 0];
    let variables = ["x1", "x2", "x3", "s0", "s1", "a0", "Z"];
    let basicVariables = ["x1", "s0", "s1", "Z"];
    let nonBasicVariables = ["a0", "x2", "x3"];

    let expected = [[[1, 0.25, 0.25, 0, 0, 7.5],
                    [0, 2.5, 0.5, 1, 0, 45],
                    [0, 1.75, 2.75, 0, 1, 32.5],
                    [0, -1.25, -0.25, 0, 0, 22.5]], ''];
                    
    let actual = cleanPhaseOneTableau(model, originalObjective, variables, basicVariables, nonBasicVariables);
    t.deepEqual(actual, expected);
    t.end();
});

test('Rebase model test', function(t) {

    let model = [[1, 0.25, 0.25, 0, 0, 7.5],
                [0, 2.5, 0.5, 1, 0, 45],
                [0, 1.75, 2.75, 0, 1, 32.5],
                [-3, -2, -1, 0, 0, 0]];
    let variables = ["x1", "x2", "x3", "s0", "s1", "Z"];
    let basicVariables = ["x1", "s0", "s1", "Z"];


    let expected = [[1, 0.25, 0.25, 0, 0, 7.5],
                    [0, 2.5, 0.5, 1, 0, 45],
                    [0, 1.75, 2.75, 0, 1, 32.5],
                    [0, -1.25, -0.25, 0, 0, 22.5]];
                    
    let actual = reBaseModel(model, variables, basicVariables);
    t.deepEqual(actual, expected);
    t.end();
});