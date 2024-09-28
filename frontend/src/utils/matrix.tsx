const imageMapping: Record<string, string> = {
    grapes: '/img/grapes.png',
    apple: '/img/apple.png',
    pear: '/img/pear.png',
    cherry: '/img/cherry.png',
    bar: '/img/bar.png'
};

/**
 * Maps a given 2D matrix of symbols to their corresponding image URLs.
 *
 * @param {string[][]} newMatrix - A 2D array of symbols to be mapped to image URLs.
 * @return {string[][]} A 2D array of image URLs corresponding to the input symbols.
 */
export const imageMatrix = (newMatrix: string[][]) => {
    return newMatrix.map((row: string[]) =>
        row.map((symbol: string) => imageMapping[symbol] || '/img/casino.png'));
}


/**
 * Identifies the winning columns in a given matrix.
 *
 * @param {string[][]} newMatrix - A 2D array representing the game matrix.
 * @return {Array<{ row: number; col: number }>} An array of objects containing the row and column indices of the winning cells.
 */
export const newWinningColumns = (newMatrix: string[][]): Array<{ row: number; col: number }> => {
    const getWinningColumns: Array<{ row: number; col: number }> = [];
    for (let i = 0; i < newMatrix[0].length; i++) {
        if (newMatrix[0][i] === newMatrix[1][i] && newMatrix[1][i] === newMatrix[2][i]) {
            getWinningColumns.push({ col: 0, row: i });
            getWinningColumns.push({ col: 1, row: i });
            getWinningColumns.push({ col: 2, row: i });
        }
    }
    return getWinningColumns;
}



