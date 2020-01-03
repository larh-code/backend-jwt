const express = require('express');
const app = express();
const authRouter = require('./controllers/authController')
const peliculasRouter = require('./controllers/peliculaController');
const categoriasRouter = require('./controllers/categoriaController');

// Settings
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routers
app.use(authRouter);
app.use(peliculasRouter);
app.use(categoriasRouter);

module.exports = app;