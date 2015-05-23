var React = require('react'),
  Router = require('react-router'),
  Route = Router.Route,
  NotFoundRoute = Router.NotFoundRoute,
  DefaultRoute = Router.DefaultRoute;

var routes = [
  <Route name="root" path="/" handler={require('./handlers/App.jsx')}>
    <DefaultRoute name="home" handler={require('./handlers/Home.jsx')} />
  </Route>,
  <Route name="error" path="/500" handler={require('./handlers/Error.jsx')} />,
  <NotFoundRoute name="not-found" handler={require('./handlers/NotFound.jsx')} />
];

module.exports = routes;