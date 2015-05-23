var Promise = require('bluebird');
var objectAssign = require('object-assign');

module.exports = fetchData = function (state) {
  var params = state.params;
  var query = state.query;

  var promises = state.routes.filter(function (route) {
    return route.handler.fetchData;
  })
  .reduce(function (p, route) {
    p = objectAssign(p, route.handler.fetchData(params, query));
    return p;
  }, {})

  return Promise.props(promises);
}; 