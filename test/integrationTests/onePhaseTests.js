import test from 'tape';
import {simplex} from '../../srcES6/simplex.js';

test('Phase One maximize test - 1', function(t) {
    
    var objective = 'Maximize Z = 3x + 2y';
    var constraints = ['2x + y <= 18',
                        '2x + 3y <= 42',
                        '3x + y <= 24'];

    var expected = {
        solution: [['y', 12], ['s2',3], ['x',3], ['Z', 33]],
        result: 'solved'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();
});

test('PhaseOne maximize test - 2', function(t) {
    
    var objective = 'Maximize Z = 40x0 + 30x1';
    let constraints =  ['x0 + 2x1 <= 16',
                        'x0 + x1 <= 9',
                        '3x0 + 2x1 <= 24'];

    var expected = {
        solution: [['s0', 4], ['x1',3], ['x0',6], ['Z', 330]],
        result: 'solved'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();
});

test('PhaseOne maximize test - 3', function(t) {
    
    var objective = 'Maximize Z = 2x1 - x2 + 2x3';
    var constraints =  ['2x1 + x2 <= 10',
                        'x1 + 2x2 - 2x3 <= 20',
                        'x2 + 2x3 <= 5'];

    var expected = {
        solution: [['x1', 5], ['s1', 20], ['x3', 2.5], ['Z', 15]],
        result: 'solved'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();
});

test('PhaseOne minimize test - 1', function(t) {
    
    var objective = 'Minimize P = 12x1 + 16x2';
    var constraints =  ['x1 + 2x2 >= 40',
                        'x1 + x2 >= 30'];

    var expected = {
        solution: [['x2', 10], ['x1', 20], ['P', 400]],
        result: 'solved'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();
});