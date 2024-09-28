const express = require('express');
const { fetchBalance, getRTP, postPlay, postSim, postDeposit, postWithdraw } = require('./slots.controller');
const csrfProtection = require('../middleware/csrfProtection');
const slotsRouter = express.Router();


slotsRouter.get('/rtp', getRTP);
slotsRouter.post('/play', csrfProtection, postPlay);
slotsRouter.post('/sim', csrfProtection, postSim);
slotsRouter.get('/wallet/balance', fetchBalance);
slotsRouter.post('/wallet/deposit', csrfProtection, postDeposit);
slotsRouter.post('/wallet/withdraw',csrfProtection, postWithdraw);

module.exports = slotsRouter;

