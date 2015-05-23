var Promise = require('bluebird'),
  http = require('http'),
  https = require('https'),
  uri = require('url');

exports.get = function (url) {
  return new Promise(function (fulfill, reject) {
    req(url).get(url, function (res) {
      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        if(res.statusCode !== 200) return reject(data);
        fulfill(data);
      });
    });
  });
};

function req (url) {
  return uri.parse(url).protocol == 'https:' ? https : http;
}
