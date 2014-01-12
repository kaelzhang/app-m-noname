#!/usr/bin/env node
var connect = require('connect');
var cwd = process.cwd();
var exec = require('child_process').exec;

var openURL = function (url) {
  switch (process.platform) {
    case "darwin":
      exec('open ' + url);
      break;
    case "win32":
      exec('start ' + url);
      break;
  }
};

var app = connect();
app.use(connect.static(cwd));
app.use(connect.directory(cwd));
var port = process.argv[2] || 8080;
app.listen(port, function () {
  var url = "http://localhost:" + port;
  console.log("Running at " + url);
  openURL(url);
});