import test from 'tape';
import {getRow, getColumn} from '../../src/matrix.js';
//var index = require('../../src/matrix.js');

test('Matrix test - getRow', function(t) {

    var matrix = [
                    [1, 2, 0, 1, 0, 0, 0, 0, 0, 70], 
                    [2, 3, -1, 0, 1, 0, 0, 0, 0, 100],
                    [1, 0, 0, 0, 0, -1, 0, 1, 0, 20], 
                    [0, 1, 0, 0, 0, 0, -1, 0, 1, 25], 
                    [-750, -900, 450, 0, 0, 0, 0, 0, 0, 0]
                ];
    var expected = [1, 2, 0, 1, 0, 0, 0, 0, 0, 70];
    var actual = getRow(matrix, 'first');
    t.deepEqual(actual, expected);
    
    expected = [-750, -900, 450, 0, 0, 0, 0, 0, 0, 0];
    actual = getRow(matrix, 'last');
    t.deepEqual(actual, expected);

    expected = [1, 0, 0, 0, 0, -1, 0, 1, 0, 20];
    actual = getRow(matrix, 2);
    t.deepEqual(actual, expected);

    t.end();
});

test('Matrix test - getColumn', function(t) {

    var matrix = [
                    [1, 2, 0, 1, 0, 0, 0, 0, 0, 70], 
                    [2, 3, -1, 0, 1, 0, 0, 0, 0, 100],
                    [1, 0, 0, 0, 0, -1, 0, 1, 0, 20], 
                    [0, 1, 0, 0, 0, 0, -1, 0, 1, 25], 
                    [-750, -900, 450, 0, 0, 0, 0, 0, 0, 0]
                ];
    var expected = [1, 2, 1, 0, -750];
    var actual = getColumn(matrix, 'first');
    t.deepEqual(actual, expected);
    
    expected = [70, 100, 20, 25, 0];
    actual = getColumn(matrix, 'last');
    t.deepEqual(actual, expected);

    expected = [0, -1, 0, 0, 450];
    actual = getColumn(matrix, 2);
    t.deepEqual(actual, expected);

    t.end();
});