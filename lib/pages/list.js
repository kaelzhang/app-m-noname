'use strict';


var Wepp = require('wepp');
var App = require('../app');
var Marionette = require('marionette');
var $ = require('zepto');
var _ = require('underscore');
var Layout = require('wepp-module-layout');

var ContentController = require('../controller/list')

var listController = Wepp.PageController.extend({
    initialize:function(){
        //initial code here
        var self = this;
        this.contentController = new ContentController();
        this.onMessage('refresh',function(){
            self.layout && self.layout.refresh();
        });
    },
    show:function(keywords,category,region,filter,lng,lat){
        var self = this;
        if(this.page && App.pageRegion.isCurrentView(this.page.layout)){
            //如果已经是当前页面了, 直接加载
        }else{
            $.when(App.openPage())
            .then(function(page){
                Wepp.UI.loading.show();
                setTimeout(function(){
                    self.initRegion(page);
                    // self.initLayout(page);
                    self.contentController.show(self,page.layout.list);
                    Wepp.UI.loading.hide();
                },1000);
            },function(){
            });
        }
    },
    initRegion:function(page){
        page.initRegion({
            template:_.template('<header class="head">WEPP</header><div class="J_content"><div class="list"></div></div>'),
            regions:{
                'head': '.head',
                'list':'.list'
            }
        });
    },
    initLayout:function(page){
        this.layout = new Layout(page,["list"]);
        this.layout.setHead("WEPP");
    }

});

exports.Controller = listController;
