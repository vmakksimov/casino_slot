const {playState, simulationState } = require('./config');

/**
 * Calculates the Return to Player (RTP) for both play and simulation states.
 *
 * @return {Object} An object containing the play RTP and simulation RTP as percentages, rounded to 2 decimal places.
 */
function rtp(){
    let playRTP = playState.totalBets > 0 ? (playState.totalWinnings / playState.totalBets) * 100 : 0;
    let simRTP = simulationState.totalBets > 0 ? (simulationState.totalWinnings / simulationState.totalBets) * 100 : 0;
  
    return {playRTP: parseFloat(playRTP.toFixed(2)), simRTP: parseFloat(simRTP.toFixed(2))};
}

module.exports = {
    rtp
}