var express = require('express');
var path = require('path');
var fs = require('fs');
var http = require('http');
var exphbs = require('express3-handlebars');
var port = 4000;
var app = express();

// express config
app.use(express.static(path.resolve(__dirname, 'public')));

// handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// home
app.get('/', function(req, res) {
  res.render('home');
});

// root
app.get('/:view', function(req, res) {
  res.render(req.params.view);
});

// sub dirs
app.get('/:section/:view', function(req, res) {
  res.render(req.params.section + '/' + req.params.view);
});

// listening
http.createServer(app).listen(port);
console.log('http listening on port ' + port);