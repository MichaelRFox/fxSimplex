export function getRow (matrix, row) {

    let end = row == 'first' ? 1 : row == 'last' ? undefined : row + 1;
    let start = row == 'first' ? 0 : row == 'last' ? -1 : row;
    return matrix.slice(start, end)[0];

}

export function getColumn (matrix, column) {

    column = column == 'first' ? 0 : column == 'last' ? matrix[0].length -1 : column;
    return matrix.reduce((a, b) => {
        return a.concat(b[column]);
    }, []);

}