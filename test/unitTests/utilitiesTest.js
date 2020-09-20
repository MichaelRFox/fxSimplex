import test from 'tape';
import {multipleSolutionTest, trim, testVariable} from '../../srcES6/utilities.js';

test('Multiple solution test v1', function(t) {


    var model = [[0.2857143, 1, 0.1428571, 0, 3],
                [6.4285714,  0, -0.2857143, 1, 15],
                [0, 0, 2, 0, 42]];

    var variables = ['x1', 'x2', 's0', 's1', 'Z'];
    var basicVariables = ['x2', 's1', 'Z'];
    var nonBasicVariables = ['x1', 's0'];

    var expected = 0;
    var actual = multipleSolutionTest (model, variables, basicVariables, nonBasicVariables);
    t.deepEqual(actual, expected);
    t.end();
});

test('Multiple solution test v2', function(t) {


    var model = [[-1, 1, 0.1428571, 0, 3],
                [0,  0, -0.2857143, 1, 15],
                [0, 0, 2, 0, 42]];

    var variables = ['x1', 'x2', 's0', 's1', 'Z'];
    var basicVariables = ['x2', 's1', 'Z'];
    var nonBasicVariables = ['x1', 's0'];

    var expected = null;
    var actual = multipleSolutionTest (model, variables, basicVariables, nonBasicVariables);
    t.deepEqual(actual, expected);
    t.end();
});

test('trim test', function(t) {

    let x = 3.345e-10;
    let expected = 0;
    let actual = trim (x);
    t.deepEqual(actual, expected);

    x = 3.345e-5;
    expected = 0.0000334;
    actual = trim (x);
    t.deepEqual(actual, expected);

    x = 3.345;
    expected = 3.345;
    actual = trim (x);
    t.deepEqual(actual, expected);


    t.end();
});

test('Test variable test', function(t) {

    let variable = 'a1';
    let prefixes = ['a', 'e', 's'];
    let expected = true;
    let actual = testVariable (variable, prefixes);
    t.deepEqual(actual, expected);

    variable = 'a1';
    prefixes = ['e', 's'];
    expected = false;
    actual = testVariable (variable, prefixes);
    t.deepEqual(actual, expected);

    variable = 'solution';
    prefixes = ['a', 'e', 's'];
    expected = false;
    actual = testVariable (variable, prefixes);
    t.deepEqual(actual, expected);

    t.end();
});
