const { STRIPS, WIN_MULTIPLIER, simulationState } = require('./config');
const { spin } = require('./game_play');

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