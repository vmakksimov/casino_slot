
const { playState } = require('./config');
const { spin } = require('./game_logic');

/**
 * Simulates a game play with the given bet amount and updates the play state accordingly.
 *
 * @param {number} bet - The amount of the bet.
 * @return {object} An object containing the game matrix and the total winnings.
 */
function play(bet){
    const { matrix, winnings } = spin(bet);

    playState.totalBets += bet;
    playState.totalWinnings += winnings;
    playState.playerWallet -= bet;
    playState.playerWallet += winnings;

    return { matrix, winnings };
}

module.exports = {
    play
}