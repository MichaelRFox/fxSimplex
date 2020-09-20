import test from 'tape';
import {simplex} from '../../srcES6/simplex.js';

test('Degenerate test - artificial variable removal', function(t) {
//https://cbom.atozmath.com/example/CBOM/Simplex.aspx?he=e&q=sm&ex=5
    var objective = 'Maximize Z = 750x1 + 900x2 - 450x3';
    var constraints =  ['x1 + 2x2 <= 70',
                        '2x1 + 3x2 - x3 <= 100',
                        'x1 >= 20',
                        'x2 >= 25'];

    var expectedOutput = {
        solution: [['s0', 0], ["x2", 25], ["x1", 20], ["x3", 15],["Z", 30750]],
        result: 'solved'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expectedOutput);
    t.end();
});

test('Degenerate test - unrestricted variable', function(t) {
//https://cbom.atozmath.com/example/CBOM/Simplex.aspx?he=e&q=sm&ex=6
    var objective = 'Maximize Z = 3x1 - 3y1 + 2x2 + x3';
    var constraints =  ['2x1 - 2y1 + 5x2 + x3 = 12',
                        '3x1 - 3y1 + 4x2 = 11'];

    var expectedOutput = {
        solution: [["x3", 4.6666667], ["x1", 3.6666667], ["Z", 15.6666667]],
        result: 'solved'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expectedOutput);
    t.end();
});

test('Degenerate test - multiple optimal solution', function(t) {
//https://cbom.atozmath.com/example/CBOM/Simplex.aspx?he=e&q=sm&ex=7
    var objective = 'Maximize Z = 6x1 + 4x2';
    var constraints =  ['2x1 + 3x2 <= 30',
                        '3x1 + 2x2 <= 24',
                        'x1 + x2 >= 3'];

    //var expectedOutput = [["x1", 2.4], ["x2", 8.4], ["Z", 48]];
    var expected = {
        solution: [['s0', 14], ['e0', 5], ['x1', 8], ['Z', 48]],
        result: 'multiple solutions'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();
});

test('Degenerate test - unbounded solution', function(t) {
//https://cbom.atozmath.com/example/CBOM/Simplex.aspx?he=e&q=sm&ex=8
    var objective = 'Maximize Z = 3x1 + 5x2';
    var constraints =  ['x1 - 2x2 <= 6',
                        'x1 <= 10',
                        'x2 >= 1'];

    var expected = {
        solution: [['x1', 10], ['e0', 1], ['x2', 2], ['Z', 40]],
        result: 'unbounded'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();
});

test('Degenerate test - infeasible solution', function(t) {
//https://cbom.atozmath.com/example/CBOM/Simplex.aspx?he=e&q=sm&ex=9
    var objective = 'Maximize Z = 6x1 + 4x2';
    var constraints =  ['x1 + x2 <= 5',
                        'x2 >= 8'];

    var expected = {
        solution: [['x2', 5], ['a0', 3], ['Z', 3]], 
        result: 'infeasible'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();
});

test('Degenerate test - infeasible solution v2', function(t) {
//https://cbom.atozmath.com/example/CBOM/Simplex.aspx?he=e&q=tp&ex=2
    var objective = 'Maximize Z = x1 - 2x2 - 3x3';
    var constraints =  ['-2x1 + x2 + 3x3 = 2',
                        '2x1 + 3x2 + 4x3 = 1'];

    var expected = {
        solution: [['a0', 1.25], ['x3', 0.25], ['Z', 1.25]],
        result: 'infeasible'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();
});

test('Degenerate test - infeasible solution v3', function(t) {

    var objective = 'Minimize Z = 2x1 + 3x2';
    var constraints =  ['0.5x1 + 0.25x2 <= 4',
                        'x1 + 3x2 >= 36',
                        'x1 + x2 = 10'];

    var expected = {
        solution: [['s0', 1.5], ['a0', 6], ['x2', 10], ['Z', 6]],
        result: 'infeasible' };
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expected);
    t.end();
});

test('Degenerate test - cycle = Blands rule', function(t) {
//http://www.math.ubc.ca/~israel/m340/cycle.pdf
    var objective = 'Maximize Z = 10x1 - 57x2 - 9x3 - 24x4';
    var constraints =  ['0.5x1 - 5.5x2 - 2.5x3 + 9x4 <= 0',
                        '0.5x1 - 1.5x2 - 0.5x3 + x4 <= 0',
                        'x1 + x2 + x3 + x4 <= 1'];

    var expectedOutput = {
        solution: [['s0', 1], ['x1', 0.5], ['x3', 0.5], ['Z', 0.5]],
        result: 'solved'};
    var actual = simplex(objective, constraints);
    t.deepEqual(actual, expectedOutput);
    t.end();
});