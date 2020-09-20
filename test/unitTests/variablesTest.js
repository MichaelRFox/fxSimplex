import test from 'tape';
import {getVariables} from '../../srcES6/variables.js';

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