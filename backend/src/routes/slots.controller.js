
const { spin } = require('../game/game_play');
const { simulate } = require('../game/game_sim');
const { rtp } = require('../game/game_rtp');
const { deposit, withdraw } = require('../game/game_wallet');
const { playState, simulationState } = require('../game/config');

// WALLET

async function fetchBalance(req, res) {
    try {
        const result = {
            playBalance: playState.playerWallet,
            simBalance: simulationState.playerWallet
        };

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

async function postDeposit(req, res) {
    try {
        const { amount, mode } = req.body;
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        console.log('mode in nodejs', mode)
        if (['sim', 'play'].includes(mode) === false) {
            return res.status(400).json({ error: 'Invalid mode' });
        }

        const result = deposit(amount, mode);
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

async function postWithdraw(req, res) {
    try {
        const { amount, mode } = req.body;
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        if (['sim', 'play'].includes(mode) === false) {
            return res.status(400).json({ error: 'Invalid mode' });
        }

        const result = withdraw(amount, mode);
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}


// RTP
async function getRTP(req, res) {
    try {
        const result = rtp();
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}


// PLAY
async function postPlay(req, res) {
    try {
        const { bet } = req.body;
        if (isNaN(bet) || bet <= 0) {
            return res.status(400).json({ error: 'Invalid bet amount' });
        }
        if (bet > playState.playerWallet) {
            return res.status(400).json({ error: 'You do not have enough balance in your waller for this bet.' });
        }
        const result = spin(bet);
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }


}


// SIM
async function postSim(req, res) {
    try {
        const { count, bet } = req.body;
        const totalBetAmount = bet * count;

        if (isNaN(count) || count <= 0) {
            return res.status(400).json({ error: 'Invalid count' });
        }
        if (isNaN(bet) || bet <= 0) {
            return res.status(400).json({ error: 'Invalid bet amount' });
        }

        if (totalBetAmount > simulationState.playerWallet) {
            return res.status(400).json({ error: 'You do not have enough balance in your waller for this bet.' });
        }

        const result = simulate(count, bet);
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

module.exports = {
    getRTP,
    postPlay,
    postSim,
    fetchBalance,
    postDeposit,
    postWithdraw
};