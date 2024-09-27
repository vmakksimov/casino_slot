const express = require('express');
const slotsRouter = require('./slots.router')
const api = express.Router();

api.use('/', slotsRouter);

module.exports = api;