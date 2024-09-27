// Game configuration

const SYMBOLS = ['cherry', 'apple', 'pear', 'grapes', 'bar'];
const STRIPS = [
    Array(30).fill().map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]),
    Array(30).fill().map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]),
    Array(30).fill().map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
];

const WIN_MULTIPLIER = 5;

const playState = {
    totalBets: 0,
    totalWinnings: 0,
    playerWallet: 1000,
};

const simulationState = {
    totalBets: 0,
    totalWinnings: 0,
    playerWallet: 1000,
};

module.exports = {
    SYMBOLS,
    STRIPS,
    WIN_MULTIPLIER,
    playState,
    simulationState
};