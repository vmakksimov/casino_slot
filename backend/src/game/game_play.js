
const { playState } = require('./config');
const { spin } = require('./game_logic');

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