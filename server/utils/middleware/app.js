var React = require('react'),
  Router = require('react-router'),
  routes = require('_shared/routes.jsx'),
  fetchData = require('_shared/utils/fetchData'),
  DocumentTitle = require('react-document-title'),
  errors = require('_shared/utils/errors');

function route (req, res, url) {
  var router = Router.create({
    routes: routes,
    location: url,
    onAbort: function (state) {
      var path = router.makePath(state.to, state.params, state.query);
      res.redirect(301, path);
    }
  });

  router.run(function (Handler, state) {
    if(state.routes[0].name == 'not-found'){
      res.status(404);
    }
    if(state.routes[0].name == 'error'){
      res.status(500);
    }
    fetchData(state).then(function (data) {
      var content = React.renderToString(React.createElement(Handler, {data: data}));
      res.render('index', {
        title: DocumentTitle.rewind(),
        content: content,
        payload: JSON.stringify(data)
      });
    })
    .catch(errors.ModelNotFound, function (error) {
      route(req, res, '/404');
    })
    .catch(function (err) {
      console.log(err);
      route(req, res, '/500');
    });
  });
  
}

module.exports = function (req, res) {
  route(req, res, req.originalUrl);
};
