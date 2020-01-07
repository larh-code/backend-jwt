const express = require('express');
const app = express();
const authRouter = require('./controllers/authController')
const peliculasRouter = require('./controllers/peliculaController');
const categoriasRouter = require('./controllers/categoriaController');
const cors = require('cors');

// Settings
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE'
}))

// Routers
app.use(authRouter);
app.use(peliculasRouter);
app.use(categoriasRouter);

module.exports = app;