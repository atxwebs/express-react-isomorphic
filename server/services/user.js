var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.list = function () {
  return User.find().exec();
};