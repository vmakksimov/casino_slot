
const { playState, simulationState } = require('./config');

let walletBalance;
let simWalletBalance;
const message = 'You do not have enough balance in your wallet for this withdrawal.';
/**
 * Deposits a specified amount into the player's wallet in either play or simulation mode.
 *
 * @param {number} amount - The amount to deposit into the wallet.
 * @param {string} mode - The mode of the deposit, either 'play' or 'simulation'.
 * @return {object} An object containing the updated wallet balances for both play and simulation modes.
 */
// function deposit(amount, mode) {
//     if (mode === 'play'){
//         walletBalance = playState.playerWallet += amount
//     } else{
//         simWalletBalance = simulationState.playerWallet += amount
//     }
//     return { walletBalance, simWalletBalance }
// }

function simDeposit(amount) {
    simWalletBalance = simulationState.playerWallet += amount
    return { simWalletBalance };
}

function playDeposit(amount) {
    walletBalance = playState.playerWallet += amount
    return { walletBalance };
}

function playWithdraw(amount, mode) {
    if (amount > playState.playerWallet) {
        throw new Error(message);
    }
    walletBalance = playState.playerWallet -= amount

    return { walletBalance };
}

function simWithdraw(amount) {
    if (amount > simulationState.playerWallet) {
        throw new Error(message);
    }   
    simWalletBalance = simulationState.playerWallet -= amount

    return { simWalletBalance };
}

module.exports = {
    playDeposit,
    simDeposit,
    playWithdraw,
    simWithdraw
}