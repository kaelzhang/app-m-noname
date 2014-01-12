'use strict';

var App = require('wepp').App;

var app = module.exports = App.create({
    device:require('./config/device'),
    router:require('./config/route')
});

app.routerManager.pageLoader = function(path, callback){
    require.async(path, callback);
};

//app start
app.start();
