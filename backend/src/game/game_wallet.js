
const { playState, simulationState } = require('./config');

let walletBalance;
let simWalletBalance;
const message = 'You do not have enough balance in your wallet for this withdrawal.';


/**
 * Deposits a specified amount into the player's wallet in simulation mode.
 *
 * @param {number} amount - The amount to deposit into the wallet.
 * @return {object} An object containing the updated wallet balance in simulation mode.
 */
function simDeposit(amount) {
    simWalletBalance = simulationState.playerWallet += amount
    return { simWalletBalance };
}

/**
 * Deposits a specified amount into the player's wallet in play mode.
 *
 * @param {number} amount - The amount to deposit into the wallet.
 * @return {object} An object containing the updated wallet balance in play mode.
 */
function playDeposit(amount) {
    walletBalance = playState.playerWallet += amount
    return { walletBalance };
}

/**
 * Withdraws a specified amount from the player's wallet in play mode.
 *
 * @param {number} amount - The amount to withdraw from the wallet.
 * @param {string} mode - The mode of the withdrawal (not used in this implementation).
 * @return {object} An object containing the updated wallet balance in play mode.
 */
function playWithdraw(amount, mode) {
    if (amount > playState.playerWallet) {
        throw new Error(message);
    }
    walletBalance = playState.playerWallet -= amount

    return { walletBalance };
}

/**
 * Withdraws a specified amount from the player's wallet in simulation mode.
 *
 * @param {number} amount - The amount to withdraw from the wallet.
 * @return {object} An object containing the updated wallet balance in simulation mode.
 */
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