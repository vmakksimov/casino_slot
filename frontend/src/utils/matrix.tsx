const imageMapping: Record<string, string> = {
    grapes: '/img/grapes.png',
    apple: '/img/apple.png',
    pear: '/img/pear.png',
    cherry: '/img/cherry.png',
    bar: '/img/bar.png'
};

export const imageMatrix = (newMatrix: string[][]) => {
    return newMatrix.map((row: string[]) =>
        row.map((symbol: string) => imageMapping[symbol] || '/img/casino.png'));
}


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



