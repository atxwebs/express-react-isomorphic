var redis = require('redis'),
  client = redis.createClient(6379, process.env.REDIS_PORT_6379_TCP_ADDR || 'localhost'),
  Promise = require('bluebird');

exports.set = function (key, value) {
  var json = JSON.stringify(value);
  client.set(key, json);
};

exports.get = function (key) {
  return new Promise(function (fulfill, reject) {
    client.get(key, function (err, value) {
      if(err) return reject(err);
      if(!value) return fulfill(value);
      try {
        var obj = JSON.parse(value);
        return fulfill(obj);
      }catch(e){
        return reject(e);
      }
    });
  });
};

exports.unset = function (key) {
  client.del(key);
};