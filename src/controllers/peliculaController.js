const Router = require('express');
const Pelicula = require('../models/pelicula');
const verifyToken = require('./verifyToken');
const Categoria = require('../models/categoria');

const router = Router();

router.get('/peliculas', verifyToken,async (req,res,next) => {
  const peliculas = await Pelicula.find();
  if(peliculas) {
    res.json({
      success: true,
      data: peliculas
    });
  }else{
    res.json({
      success: false,
      msj: peliculas
    });
  }
});

router.get('/pelicula/:id', verifyToken,async (req,res,next) => {
  let pelicula = await Pelicula.aggregate().lookup({
    from: Categoria.collection.name,
    localField: 'categoria',
    foreignField: 'letra',
    as: 'categoria_data'
  });
  pelicula = pelicula.filter(item => item._id == req.params.id);
  if(pelicula) {
    res.json({
      success: true,
      data: pelicula[0]
    });
  }else{
    res.json({
      success: false,
      msj: pelicula
    });
  }
});

router.post('/pelicula', verifyToken,async (req,res,next) =>{
  const data = req.body;
  if(data.nombre && data.descripcion) {
    const pelicula = new Pelicula();
    pelicula.nombre = data.nombre;
    pelicula.descripcion = data.descripcion;
    pelicula.anio = data.anio;
    pelicula.categoria = data.categoria;
    await pelicula.save();
    res.json({
      success: true,
      data: pelicula
    });
  }else {
    res.json({
      success: false,
      msj: 'no hay datos'
    });
  }
});

router.put('/pelicula/:id',async (req,res,next) => {
  const { id } = req.params;
  const data = req.body;
  if(data.nombre && data.descripcion) {
    const pelicula = await Pelicula.findByIdAndUpdate(id,{
      nombre: data.nombre,
      descripcion: data.descripcion,
      anio: data.anio,
      categoria: data.categoria
    });
    res.json({
      success: true,
      data: pelicula
    });
  }else{
    res.json({
      success: false,
      msj: 'id o data vacio'
    });
  }
});

router.delete('/pelicula/:id',async (req,res,next) => {
  const { id } = req.params;
  const del = await Pelicula.findByIdAndDelete(id);
  if(del) {
    res.json({
      success: true,
      msj: 'pelicula eliminada'
    })
  }else {
    res.json({
      success: false,
      msj: 'no se pudo eliminar la pelicula'
    })
  }
})

module.exports = router;