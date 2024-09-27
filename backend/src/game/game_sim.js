const { STRIPS, WIN_MULTIPLIER, simulationState } = require('./config');
const { spin } = require('./game_play');

/**
 * Simulates a game by spinning a set number of times and calculating the total winnings.
 *
 * @param {number} count - the number of times to spin the game
 * @param {number} bet - the amount to bet on each spin
 * @return {Object} - an object containing the net result, total winnings, and the winning matrix
 * @property {number} netResult - the difference between the total winnings and the total bet amount
 * @property {number} totalwinningsFromSpin - the total winnings from all spins
 * @property {Array} simMatrix - the winning matrix from the last spin
 */
function simulate(count, bet) {
    const totalBetAmount = bet * count;
    simulationState.playerWallet -= totalBetAmount
    let totalwinningsFromSpin = 0;
    let simMatrix;
    for (let i = 0; i < count; i++) {
        const { matrix, winnings } = spin(bet);
        totalwinningsFromSpin += winnings;
        simMatrix = matrix;
    }
    
    let netResult = totalwinningsFromSpin - totalBetAmount;
    simulationState.playerWallet += totalwinningsFromSpin;
    simulationState.totalWinnings += totalwinningsFromSpin;
    simulationState.totalBets += totalBetAmount;

    return { netResult, totalwinningsFromSpin, simMatrix };

}

module.exports = {
    simulate
}