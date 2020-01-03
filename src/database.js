const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/netflix_jwt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(db => {
    console.log('database connected!');
  })