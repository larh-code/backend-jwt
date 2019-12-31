const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = require('./verifyToken');

router.post('/signup',async (req,res,next) => {
  const { username, email, password, fullname } = req.body;
  const userNew = new User({
    username,
    email,
    password,
    fullname
  });
  userNew.password = await userNew.encryptPassword(password);
  await userNew.save();
  const token = jwt.sign({id: userNew._id}, config.secret, {
    expiresIn: 60 * 60 * 24
  });
  res.json({ success: true, message: 'usuario creado!', token: token });
});

router.post('/signin',async (req,res,next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if(!user) {
    return res.status(401).json({
      success: false,
      message: 'usuario no existe'
    })
  }
  const valid = await user.validPassword(password);
  if(!valid) {
    return res.status(401).json({
      success: false,
      message: 'password invalid'
    })
  }
  const token = jwt.sign({id: user._id}, config.secret, {
    expiresIn: 60 * 60 * 24
  });
  res.json({
    success: true,
    message: 'usuario logeado',
    token: token
  })
});

router.get('/me', verifyToken, async (req,res,next) => {
  const user = await User.findById(req.userId, { password: 0 });
  if(!user) {
    return res.status(404).send('usuario no existe');
  }
  res.json({
    success: true,
    message: 'usuario con token',
    data: user
  })
});

module.exports = router;