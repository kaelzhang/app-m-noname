'use strict';


var Marionette = require('marionette');
var Backbone = require('backbone');
var View = require('../view/list');
var List = require('../model/list');
var Wepp = require('wepp');

var Controller = Wepp.PageController.extend({
    initialize:function(){
        this.collection = List;
        this.view = new View({
            collection:this.collection
        });

    },
    show:function(page,region){
        console.log(this.view)
        region.show(this.view);
        page.message('refresh');
    }
});

module.exports = Controller;
