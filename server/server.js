var express = require('express');
var glob = require('glob');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');

var exphbs  = require('express-handlebars');

module.exports = function (config) {
  
  // database
  mongoose.connect('mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.database);
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });

  var models = glob.sync(config.root + '/server/models/*.js');
  models.forEach(function (model) {
    require(model);
  });

  // express
  var app = express();
  
  app.engine('.hbs', exphbs({
    layoutsDir: config.root + '/server/views/layouts/',
    partialsDir: config.root + '/server/views',
    defaultLayout: 'main',
    extname: '.hbs'
  }));

  if(process.env.NODE_ENV !== 'production'){
    app.locals.ENV_DEVELOPMENT = true;
  }

  app.set('views', config.root + '/server/views');
  app.set('view engine', '.hbs');

  app.set('x-powered-by', false);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(logger('[:date[web]] :method :url :status :response-time ms - :res[content-length]'));
  app.use(function (req, res, next) {
    res.locals.url = req.url;
    next();
  });

  var controllers = glob.sync(config.root + '/server/controllers/**/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });
  
  // Mount React app
  app.use('*', require('_server/utils/middleware/app'));

  app.use(function (req, res) {
    res.status(404);
    res.render('404', {
      title: "404"
    });
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

  return app.listen(config.port);
};
