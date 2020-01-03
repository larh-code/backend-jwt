const { Schema, model } = require('mongoose');

const categoriaSchema = new Schema({
  letra: String,
  descripcion: String,
  anio: Number
});

module.exports = model('Categoria', categoriaSchema);