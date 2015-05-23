var express = require('express'),
  router = express.Router(),
  user = require('../services/user');

module.exports = function (app) {
  app.use('/api/user', router);
};

router.get('/', function (req, res) {

  user.list().then(function (users) {
    res.json(users);
  });

});