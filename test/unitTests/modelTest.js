import test from 'tape';
import {parseModel} from '../../src/model.js';

test('Model test - two phase', function(t) {

    var objective = 'Maximize Z = 750x1 + 900x2 - 450x3';
    var constraints =  ['x1 + 2x2 <= 70',
                        '2x1 + 3x2 - x3 <= 100',
                        'x1 >= 20',
                        'x2 >= 25'];

    var expectedOutput = [[[ 1, 2, 0, 1, 0, 0, 0, 0, 0, 70 ], 
                            [2, 3, -1, 0, 1, 0, 0, 0, 0, 100],
                            [1, 0, 0, 0, 0, -1, 0, 1, 0, 20], 
                            [0, 1, 0, 0, 0, 0, -1, 0, 1, 25], 
                            [-750, -900, 450, 0, 0, 0, 0, 0, 0, 0]], 
                            ['x1', 'x2', 'x3', 's0', 's1', 'e0', 'e1', 'a0', 'a1', 'Z'],
                             'max'];
    var actual = parseModel(objective, constraints);
    t.deepEqual(actual, expectedOutput);
    t.end();
});

test('Model test - one phase minimize', function(t) {

    var objective = 'Minimize C = -2x + y';
    var constraints =  ['x + 2y <= 6',
                        '3x + 2y <= 12'];

    var expectedOutput =    [[[1, 2, 1, 0, 6],
                            [3, 2, 0, 1, 12],
                            [2, -1, 0, 0, 0]],
                            ['x', 'y', 's0', 's1', 'C'],
                            'min'];

    var actual = parseModel(objective, constraints);
    t.deepEqual(actual, expectedOutput);
    t.end();
});

test('Model test - bad objective', function(t) {

    var objective = 'Minimize C < -2x + y';
    var constraints =  ['x + 2y <= 6',
                        '3x + 2y <= 12'];

    var expectedOutput = [[], '', ''];

    var actual = parseModel(objective, constraints);
    t.deepEqual(actual, expectedOutput);
    t.end();
});

test('Model test - reserved variables', function(t) {

    var objective = 'Minimize C = -2x + y';
    var constraints =  ['a + 2e + x1 <= 6',
                        '3a + 2e + 5x1 <= 12'];

    var expectedOutput = [[], '', ''];

    var actual = parseModel(objective, constraints);
    t.deepEqual(actual, expectedOutput);
    t.end();
});
