
const { play } = require('../game/game_play');
const { simulate } = require('../game/game_sim');
const { rtp } = require('../game/game_rtp');
const { playDeposit, simDeposit, playWithdraw, simWithdraw } = require('../game/game_wallet');
const { playState, simulationState } = require('../game/config');

// WALLET

/**
 * Retrieves the current balance of the player's wallet in both play and simulation modes.
 *
 * @param {object} req - The incoming HTTP request object.
 * @param {object} res - The outgoing HTTP response object.
 * @return {object} A JSON response containing the play and simulation balances.
 */
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


/**
 * Handles a deposit request by validating the amount and mode, then processing the transaction.
 *
 * @param {object} req - The incoming HTTP request object containing the deposit amount and mode.
 * @param {object} res - The outgoing HTTP response object.
 * @return {object} A JSON response containing the result of the transaction or an error message.
 */
async function postDeposit(req, res) {
    const maxDeposit = 1000000;
    try {
        const { amount, mode } = req.body;
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        if (amount > maxDeposit) {
            return res.status(400).json({ error: 'You can only deposit up to 1,000,000' });
        }

        if (['sim', 'play'].includes(mode) === false) {
            return res.status(400).json({ error: 'Invalid mode' });
        }
        
        let transactionResult;
        if (mode === 'play') {
            transactionResult = playDeposit(amount);
        } else {
            transactionResult = simDeposit(amount);
        }

        return res.status(200).json(transactionResult);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

/**
 * Handles a withdrawal request by validating the amount and mode, then processing the transaction.
 *
 * @param {object} req - The incoming HTTP request object containing the withdrawal amount and mode.
 * @param {object} res - The outgoing HTTP response object.
 * @return {object} A JSON response containing the result of the transaction or an error message.
 */
async function postWithdraw(req, res) {
    try {
        const { amount, mode } = req.body;
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        if (!['sim', 'play'].includes(mode)) {
            return res.status(400).json({ error: 'Invalid mode' });
        }

        let transactionResult;
        if (mode === 'play'){
            transactionResult = playWithdraw(amount);
        } else {
            transactionResult = simWithdraw(amount);
        }

        return res.status(200).json(transactionResult);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}


/**
 * Calculates the current RTP.
 *
 * @param {object} req - The incoming HTTP request object containing the deposit amount and mode.
 * @param {object} res - The outgoing HTTP response object.
 * @return {object} A JSON response containing the result of the current RTP.
 */
async function getRTP(req, res) {
    try {
        const result = rtp();
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

/**
 * Initiates a single spin of the game in play mode and calucates the winnings.
 *
 * @param {object} req - The incoming HTTP request object containing the deposit amount and mode.
 * @param {object} res - The outgoing HTTP response object.
 * @return {object} A JSON response containing the result of the winnings of a single spin.
 */
async function postPlay(req, res) {
    try {
        const { bet } = req.body;
        if (isNaN(bet) || bet <= 0) {
            return res.status(400).json({ error: 'Invalid bet amount' });
        }
        if (bet > playState.playerWallet) {
            return res.status(400).json({ error: 'You do not have enough balance in your waller for this bet.' });
        }

        const result = play(bet);
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }


}


/**
 * Initiates a a customized number of spins in sim mode and calucates the winnings and returns rtp.
 *
 * @param {object} req - The incoming HTTP request object containing the deposit amount and mode.
 * @param {object} res - The outgoing HTTP response object.
 * @return {object} A JSON response containing the result of the simulation winnings/losses.
 */
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