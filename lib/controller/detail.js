'use strict';


var Marionette = require('marionette');
var Backbone = require('backbone');
var View = require('../view/detail');
var Detail = require('../model/detail');
var Wepp = require('wepp');

var Controller = Wepp.PageController.extend({
    initialize: function (id) {
        this.model = new Detail({
            id: parseInt(id)
        });

        this.view = new View({
            model: this.model
        });
    },
    show:function(page, region){
        region.show(this.view);
        page.message('refresh');
    }
});

module.exports = Controller;
