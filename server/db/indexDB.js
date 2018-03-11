const mongoose = require('mongoose');

const url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/auth';

mongoose.connect(url, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to db');
  }
});

module.exports = { mongoose };
