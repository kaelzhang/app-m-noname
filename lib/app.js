var Wepp = require("wepp");
var Share = require('./base/share');
var Nav = require('./modules/common/nav/controller');

var App = Wepp.App.create({
    device:require('./config/deviceconfig'),
    router:require("./config/routeconfig")
});

//初始化导航
App.Nav = new Nav();

App.routerManager.pageLoader = function(js,cb){
    require.async(js,cb);
};

App.routerManager.on('before:route:change',function(config,controller){
    if(App.pageRegion.hasPage()){
        App.Nav.show();
    }else {
        App.Nav.hide();
    }
});

App.routerManager.on('route:change',function(config,controller){
    //设置分享
    if(config.share){
        controller.trigger && controller.trigger('before_share_config',config.share);
        Share.enable(true);
        Share.config(config.share);
    }else {
        Share.enable(false);
    }

});

//app start
App.start();

// var s = document.createElement('script');
// s.src = 'http://192.168.31.138:8090/target/target-script-min.js#anonymous';
// document.getElementsByTagName('head')[0].appendChild(s);



module.exports = App;
