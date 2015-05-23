var cache = require('./cache');

module.exports = function () {

  Object.keys(__DATA__).forEach(function (key) {
    cache.set(key, __DATA__[key]);
  });
  delete window.__DATA__;

};