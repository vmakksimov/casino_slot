
const { playState, simulationState } = require('./config');

let walletBalance;
let simWalletBalance;
function deposit(amount, mode) {
    if (mode === 'play'){
        walletBalance = playState.playerWallet += amount
    } else{
        simWalletBalance = simulationState.playerWallet += amount
    }
    return { walletBalance, simWalletBalance }
}

function withdraw(amount, mode) {
    if (mode === 'play'){
        if (amount > playState.playerWallet) {
            throw new Error('You do not have enough balance in your wallet for this withdrawal.');
        }
        walletBalance = playState.playerWallet -= amount
    } else{
        if (amount > simulationState.playerWallet) {
            throw new Error('You do not have enough balance in your wallet for this withdrawal.');
        }
        simWalletBalance = simulationState.playerWallet -= amount
    }
    return { walletBalance, simWalletBalance }
}

module.exports = {
    deposit,
    withdraw
}