const mongoose = require('mongoose');

const usermodel = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  isAdmin: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = usermodel;