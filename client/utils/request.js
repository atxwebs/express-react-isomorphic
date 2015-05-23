var request = require('browser-request');
var Promise = require('bluebird');

module.exports = function (options) {
  return new Promise(function (resolve, reject) {
    request(options, function (err, response, body) {
      if(err) return reject(err);
      return resolve(body);
    });
  });
};