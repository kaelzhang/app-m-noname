var $ = require('zepto');
var _ = require('underscore');
var Wepp = require('wepp');
var Marionette = require('marionette');
var App = require('../app');
var WeppLayout = require('wepp-module-layout');

//sub app Detail 详情页
var DetailMainController = require("../modules/detail/detailmain/controller"),
    ShopController = require("../modules/common/detailshop/controller"),
    DetailExtraController = require("../modules/common/detailextra/controller"),
    BuyBoxController = require("../modules/common/buy/controller"),
    City = require("../entities/city");
var UserModel = require('../entities/getuserprofilegn').UserModel;


var DetailController = Wepp.PageController.extend({
    initialize:function(){
        var self = this;
        this.onMessage('iscroll:refresh',function(){
            self.moduleLayout && self.moduleLayout.refresh();
        });
    },
    show: function(id) {
        var self = this
        $.when(App.openPage()).then(_.bind(function(page) {
            self.moduleLayout = new WeppLayout(page,[{
                template: require('../modules/detail/layout.html'),
                region:{
                    'detailMain': '.detail-main',
                    'shop': '.detail-shop',
                    'detailExtra': '.detail-extra',
                    'moreDeal': '.more-deal',
                    'buy': '.buy-box-con',
                    'recommDeal': '.recomm-deal'
                }
            }]);
            self.moduleLayout.setHead('团购详情');

            var param = {
                id: id,
                cityid: City.getId()
            };
            var detailMainController = new DetailMainController(param);
            var detailExtraController = new DetailExtraController(param);
            var buyBoxController = this.buyBoxController = new BuyBoxController(param);
            var shopController = new ShopController(param);

            detailMainController.show(page.layout.detailMain, self);
            detailExtraController.show(page.layout.detailExtra, self);
            buyBoxController.show(page.layout.buy, self);
            shopController.show(page.layout.shop, self);

            //尝试请求下用户接口，如果登录，就修改下购买的url，不走open.qq
            self.tryLogin();
        },this));
    },
    tryLogin:function(){
        var userModel = new UserModel();
        var self = this;
        userModel.on('change',function(model){
            if(model.get('code')==200){
                //说明是登录用户
                self.changeBuyUrl();
            }
        });
    },
    changeBuyUrl:function(){
        var model = this.buyBoxController.model;
        if(model.get('status')=="0"){
            $('.J_buy').attr('href', model.get('originNextUrl'));
        }
    }
});

exports.Controller = DetailController;


