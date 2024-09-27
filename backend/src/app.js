const express = require("express");
const cors = require("cors");
const path = require('path');
const morgan = require('morgan');
const api = require('./routes/api');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
}));

app.use(morgan("combined"));
app.use(express.json());
app.use(api);

module.exports = app;
