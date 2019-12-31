const express = require('express');
const app = express();
const authRouter = require('./controllers/authController')

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(authRouter);

module.exports = app;