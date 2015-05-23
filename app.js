require('node-jsx').install({extension: '.jsx'});

var config = require('./config/config');
var server = require('_server/server');

server(config);