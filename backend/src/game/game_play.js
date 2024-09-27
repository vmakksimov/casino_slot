
const crypto = require('crypto');
const { STRIPS, WIN_MULTIPLIER, playState } = require('./config');

/**
 * Calculates the winnings based on the given matrix and bet.
 *
 * @param {Array<Array<string>>} matrix - A 2D array representing the game matrix.
 * @param {number} bet - The amount of the bet.
 * @return {number} The total winnings.
 */
function calculateWinnings(matrix, bet) {
    let winnings = 0;
    for (let i = 0; i < STRIPS.length; i++) {
        if (matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i]) {
            winnings += bet * WIN_MULTIPLIER;
        }
    }

    return winnings;
}
function getRandomInt(max) {
    return crypto.randomInt(max);
}
/**
 * Simulates a game spin with the given bet amount.
 *
 * @param {number} bet - The amount of the bet.
 * @return {object} An object containing the game matrix and the total winnings.
 */
function spin(bet) {
    const matrix = STRIPS.map(strip => {
        const start = getRandomInt(strip.length);
        return [
            strip[start],
            strip[(start + 1) % strip.length],
            strip[(start + 2) % strip.length]
        ];
    });


    const winnings = calculateWinnings(matrix, bet);

    playState.totalBets += bet;
    playState.totalWinnings += winnings;
    playState.playerWallet -= bet;
    playState.playerWallet += winnings;

    return { matrix, winnings };
}


module.exports = {
    spin,
    calculateWinnings,
    getRandomInt
}