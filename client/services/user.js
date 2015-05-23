var Promise = require('bluebird');
var request = require('../utils/request');
var cache = require('../utils/cache');
var errors = require('_shared/utils/errors');

exports.list = function () {
  var cached = cache.get('user.list');
  if(cached){
    return Promise.resolve(cached);
  }else{
    return request({
      url: '/api/user'
    }).then(function (data) {
      return cache.set('user.list', data);
    });
  }
};