var cache = {};

exports.set = function (key, value) {
  return cache[key] = value;
};

exports.get = function (key) {
  return cache[key];
};

exports.clean = function () {
  cache = {};
};

exports.expire = function (key) {
  delete cache[key];
};