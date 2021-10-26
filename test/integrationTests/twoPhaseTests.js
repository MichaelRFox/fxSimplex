import test from 'tape';
import {simplex} from '../../src/simplex.js';

test('Two-phase test - minimization v1', function(t) {
    
    var objective = 'Minimize Z = 2x0 + 3x1';
    var constraints =  ['0.5x0 + 0.25x1 <= 4',
                        'x0 + 3x1 >= 20',
                        'x0 + x1 = 10'];

    var expected = {
        solution: [['x0', 5], ['s0', 0.25], ['x1', 5], ['Z', 25]],
        result: 'solved'};

    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();
});


test('Two-phase test - maximization v1', function(t) {

    var objective = 'Maximize Z = 2x0 + 3x1 + 4x2';
    var constraints = ['3x0 + 2x1 +  x2 <= 10',
                        '2x0 + 3x1 + 3x2 <= 15',
                        '2x1 - x2 <= 14',
                        'x0 + x1 - x2 >= 4'];

    var expected = {
        solution: [["x0", 0.3333333],["x2", 0.5555556], ['s2', 6.1111111], ["x1", 4.2222222],["Z", 15.5555556]],
        result: 'solved'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();
});

test('Two-phase test - maximization v2', function(t) {

    var objective = 'Maximize Z = 3x1 + 2x2 + x3'
    var constraints =   ['4x1 + x2 + x3 = 30',
                        '2x1 + 3x2 + x3 <= 60',
                        'x1 + 2x2 + 3x3 <= 40'];

    var expected = {
        solution: [["x1", 3],["x2", 18], ['s1', 1], ["Z", 45]],
        result: 'multiple solutions'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();

});

test('Two-phase test - maximization v3', function(t) {

    var objective = 'Maximize Z = 2x1 + 3x2 + x3'
    var constraints =   ['x1 + x2 + x3 <= 40',
                         '2x1 + x2 - x3 >= 10',
                         '-x2 + x3 >= 10'];

    var expected = {
        solution: [["x2", 10],["x1", 10], ['x3', 20], ["Z", 70]],
        result: 'solved'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();

});

test('Two-phase test - minimization v2', function(t) {
//https://cbom.atozmath.com/example/CBOM/Simplex.aspx?he=e&q=tp
    var objective = 'Minimize Z = x1 + x2'
    var constraints =   ['2x1 + x2 >= 4',
                        'x1 + 7x2 >= 7'];

    var expected = {
        solution: [["x1", 1.6153846],["x2", 0.7692308], ["Z", 2.3846154]],
        result: 'solved'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();

});

test('Two-phase test - minimization v3', function(t) {
//https://cbom.atozmath.com/example/CBOM/Simplex.aspx?he=e&q=tp&ex=1
    var objective = 'Minimize Z = 5x1 + 2x2 + 10x3'
    var constraints =   ['x1 - x3 <= 10',
                        'x2 + x3 >= 10'];

    var expected = {
        solution: [["s0", 10],["x2", 10], ["Z", 20]],
        result: 'solved'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();

});

test('Two-phase test - maximization v4', function(t) {
//http://www.maths.qmul.ac.uk/~ffischer/teaching/opt/notes/notes8.pdf
    var objective = 'Maximize Z= 2x1 + 3x2 + 4x3'
    var constraints =   ['3x1 + 2x2 + x3 <= 10',
                         '2x1 + 3x2 + 3x3 <= 15',
                         'x1 + x2 - x3 >= 4'];

    var expected = {
        solution: [['x1', 0.3333333], ['x3', 0.5555556], ['x2', 4.2222222], ['Z', 15.5555556]],
        result: 'solved'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();

});

test('Two-phase test - minimization v5', function(t) {
//http://www.maths.qmul.ac.uk/~ffischer/teaching/opt/notes/notes8.pdf
    var objective = 'Minimize Z = 6x1 + 3x2'
    var constraints =   ['x1 + x2 >= 1',
                         '2x1 - x2 >= 1',
                         '3x2 <= 2'];

    var expected = {
        solution: [[ 'x2', 0.3333333], ['x1', 0.6666667], ['s0', 1], ['Z', 5]],
        result: 'solved'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();

});

