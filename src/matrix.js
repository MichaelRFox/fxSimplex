export function getRow(matrix, row) {
    var end = 'first' == row ? 1 : 'last' == row ? void 0 : row + 1;
    var start = 'first' == row ? 0 : 'last' == row ? -1 : row;
    return matrix.slice(start, end)[0];
}

export function getColumn(matrix, column) {
    column = 'first' == column ? 0 : 'last' == column ? matrix[0].length - 1 : column;
    return matrix.reduce((function(a, b) {
        return a.concat(b[column]);
    }), []);
}