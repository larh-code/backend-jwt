const { Schema, model } = require('mongoose');

const peliculaSchema = new Schema({
  nombre: String,
  descripcion: String,
  anio: Number,
  categoria: String
});

module.exports = model('Pelicula', peliculaSchema);