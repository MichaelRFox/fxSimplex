import test from 'tape';
import {getPivot} from '../../srcES6/pivot.js';

test('getPivot test - Blands rule', function(t) {


    var model = [[-4, 8, 2, 0, 1, -9, 0, 0],
                [0.5, -1.5, -0.5, 1, 0, 1, 0, 0],
                [0.5, 2.5, 1.5, 0, 0, -1, 1, 1],
                [-22, 93, 21, 0, 0, -24, 0, 0]];

    var variables = ['x1', 'x2', 'x3', 'x4', 's0', 's1', 's2', 'Z'];
    var basicVariables = ['s0', 'x4', 's2', 'Z'];
    var nonBasicVariables = ['x1', 'x2', 'x3', 's1'];
    var type = 'max';

    var expected = {row:1, column:0};
    var actual = getPivot (model, variables, basicVariables, nonBasicVariables, type);
    t.deepEqual(actual, expected);
    t.end();
});

test('getPivot test', function(t) {


    var model = [[1, -11, -5, 18, 2, 0, 0, 0],
                [0, 4, 2, -8, -1, 1, 0, 0],
                [0, 12, 6, -17, -2, 0, 1, 1],
                [0, -53, -41, 204, 20, 0, 0, 0]];

    var variables = ['x1', 'x2', 'x3', 'x4', 's0', 's1', 's2', 'Z'];
    var basicVariables = ['x1', 's1', 's2', 'Z'];
    var nonBasicVariables = ['x2', 'x3', 'x4', 's0'];
    var type = 'max';

    var expected = {row:1, column:1};
    var actual = getPivot (model, variables, basicVariables, nonBasicVariables, type);
    t.deepEqual(actual, expected);
    t.end();
});

