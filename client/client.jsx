var React = require('react');
var Router = require('react-router');
var routes = require('_shared/routes.jsx');
var fetchData = require('_shared/utils/fetchData');
var rehydrate = require('./utils/rehydrate');
var nprogress = require('nprogress');

rehydrate();
var initial = true;

Router.run(routes, Router.HistoryLocation, function (Handler, routerState) {
  if(!initial) nprogress.start();

  fetchData(routerState).then(function (data) {
    React.render(
      <Handler data={data} />,
      document.getElementById('app')
    );
  }).finally(function () {
    if(!initial) nprogress.done();
    initial = false;
  });
});