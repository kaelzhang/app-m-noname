'use strict';


var App = require("wepp").App;
var Nav = require('./modules/common/nav/controller');

var app = module.exports = App.create({
    device:require('./config/deviceconfig'),
    router:require("./config/routeconfig")
});

//初始化导航
app.Nav = new Nav();

app.routerManager.pageLoader = function(path, callback){
    require.async(path, callback);
};

app.routerManager.on('before:route:change',function(config,controller){
    if(app.pageRegion.hasPage()){
        app.Nav.show();
    }else {
        app.Nav.hide();
    }
});

// app.routerManager.on('route:change',function(config,controller){
//     //设置分享
//     if(config.share){
//         controller.trigger && controller.trigger('before_share_config',config.share);
//         Share.enable(true);
//         Share.config(config.share);
//     }else {
//         Share.enable(false);
//     }
// });

//app start
app.start();
