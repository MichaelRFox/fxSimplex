/**
 * @module matrix
 * @desc The matrix module provide helper functions to retrieve rows or columns from a matrix.
 */

 /**
  * @function getRow
  * @desc Retrieves a row from a matrix.
  * @param {Array} matrix The matrix from which to retrieve the row.
  * @param {(string | number)} row The row to retrieve. May be the string 'first' or 'last' or
  * an index to the row to retrieve.
  * @returns {Array} The row retrieved.
  */
export function getRow (matrix, row) {

    let end = row == 'first' ? 1 : row == 'last' ? undefined : row + 1;
    let start = row == 'first' ? 0 : row == 'last' ? -1 : row;
    return matrix.slice(start, end)[0];

}

/**
 * @function getColumn
 * @desc Retrieves a column from a matrix.
 * @param {Array} matrix The matrix from which to retrieve the column.
 * @param {(string | number)} column The column to retrieve. May be the string 'first' or 'last'
 * or an index to the column to retrieve.
 * @returns {Array} The column retrieved.
 */
export function getColumn (matrix, column) {

    column = column == 'first' ? 0 : column == 'last' ? matrix[0].length -1 : column;
    return matrix.reduce((a, b) => {
        return a.concat(b[column]);
    }, []);

}