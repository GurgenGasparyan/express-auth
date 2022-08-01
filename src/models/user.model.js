const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    username: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
