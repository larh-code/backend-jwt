const Router = require('express');
const Categoria = require('../models/categoria');
const verifyToken = require('./verifyToken');

const router = Router();

router.get('/Categorias', verifyToken,async (req,res,next) => {
  const categoria = await Categoria.find();
  if(categoria) {
    res.json({
      success: true,
      data: categoria
    });
  }else{
    res.json({
      success: false,
      msj: categoria
    });
  }
});

router.get('/categoria/:id', verifyToken,async (req,res,next) => {
  const categoria = await Categoria.findById(req.params.id);
  if(categoria) {
    res.json({
      success: true,
      data: categoria
    });
  }else{
    res.json({
      success: false,
      msj: categoria
    });
  }
});

router.post('/categoria', verifyToken,async (req,res,next) =>{
  const data = req.body;
  if(data.letra && data.descripcion && data.anio) {
    const categoria = new Categoria();
    categoria.letra = data.letra;
    categoria.descripcion = data.descripcion;
    categoria.anio = data.anio;
    await categoria.save();
    res.json({
      success: true,
      data: categoria
    });
  }else {
    res.json({
      success: false,
      msj: 'no hay datos'
    });
  }
});

router.put('/categoria/:id',async (req,res,next) => {
  const { id } = req.params;
  const data = req.body;
  if(data.letra && data.descripcion && data.anio) {
    const categoria = await Categoria.findByIdAndUpdate(id,{
      letra: data.letra,
      descripcion: data.descripcion,
      anio: data.anio
    });
    res.json({
      success: true,
      data: categoria
    });
  }else{
    res.json({
      success: false,
      msj: 'id o data vacio'
    });
  }
});

router.delete('/categoria/:id',async (req,res,next) => {
  const { id } = req.params;
  const del = await Categoria.findByIdAndDelete(id);
  if(del) {
    res.json({
      success: true,
      msj: 'categoria eliminada'
    })
  }else {
    res.json({
      success: false,
      msj: 'no se pudo eliminar la categoria'
    })
  }
})

module.exports = router;