var express = require('express');
var path = require('path');
var fs = require('fs');
var http = require('http');

var port = 4000;
var app = express();

// express config
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', function(req, res) {
  renderTemplate('home', res);
});

app.get('/:template', function(req, res) {
  // don't render a .ico or other file format
  if (req.params.template.indexOf('.') > -1) {
    return;
  }

  renderTemplate(req.params.template, res);
});

function renderTemplate(template, res) {
  // synchronous
  var header = fs.readFileSync(path.resolve(__dirname, 'shared', 'header.html'));
  var footer = fs.readFileSync(path.resolve(__dirname, 'shared', 'footer.html'));
  var content = fs.readFileSync(path.resolve(__dirname, 'template', template + '.html'));

  res.send(header + content + footer);
}

// listening
http.createServer(app).listen(port);
console.log('http listening on port ' + port);