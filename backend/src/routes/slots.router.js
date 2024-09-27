const express = require('express');
const { fetchBalance, getRTP, postPlay, postSim, postDeposit, postWithdraw } = require('./slots.controller');
const slotsRouter = express.Router();

slotsRouter.get('/rtp', getRTP);
slotsRouter.post('/play', postPlay);
slotsRouter.post('/sim', postSim);
slotsRouter.get('/wallet/balance', fetchBalance);
slotsRouter.post('/wallet/deposit', postDeposit);
slotsRouter.post('/wallet/withdraw', postWithdraw);



module.exports = slotsRouter;

