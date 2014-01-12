var Marionette = require('marionette');
var View = require("./view");
var $ = require('zepto');
var _ = require('underscore'),
    Share = require('../../../base/share'),
    Detail = require("../../../entities/detail"),
    BuyView = require("../../common/buy/view");

    module.exports = Marionette.Controller.extend({
        initialize: function(param) {
            this.model =  new Detail.DetailModel(param);
            this.view = new View({
                model: this.model
            });

            this.model.on("change",_.bind(function(data){
                this.region.show(this.view);

                //设置分享
                Share.config({
                    img_url:data.get('photo'),
                    link:location.href,
                    desc:data.get('titleDesc'),
                    title:data.get('shortTitle')
                });

            },this));

            this.view.on("dom:refresh", _.bind(function() {
                this.showImage();
                this.showBuyBox();
            },this));
        },
        show: function(region, pageController) {
            this.region = region;
            this.pageController = pageController;
        },
        showImage: function() {
            var self = this,
                img = new Image();
            img.src = this.model.get('photo');
            $(img).attr({
                width:"100%",
                height:"200px"
            });
            img.onload = function() {
                $('.deal-img').append($(this));
                $(img).attr('height','auto');
                self.initIscroll();
            };
        },
        showBuyBox: function() {
            var buyView = new BuyView({model: this.model});
            buyView.render();
            buyView.$el.insertAfter($(".deal-img"));
            this.initIscroll();
        },
        initIscroll:function(){
            this.pageController.message('iscroll:refresh');
        }
    });

