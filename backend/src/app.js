const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const api = require('./routes/api');
const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Tokens = require('csrf');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const tokens = new Tokens();
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN, 
    credentials: true 
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
app.use(limiter);
app.use(morgan("combined"));
app.use(express.json());


app.use((req, res, next) => {
    if (!req.cookies['csrf-token']) {
      const token = tokens.create(process.env.CSRF_SECRET);
      res.cookie('csrf-token', token, { httpOnly: true });
    }
    next();
  });



app.use(api);

module.exports = app;
