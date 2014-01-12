'use strict';

var Backbone = require('backbone');

var FORMAT = {

} 

var detail = module.exports = Backbone.Model.extend({
    initialize: function(param) {
        this._param = param;
        this.setUrl();
        this.fetch();
    },
    baseUrl: '/activity/activityDetailAction',
    setUrl: function() {
        this.url = this.baseUrl + '?id=' + this._param.id;
    },

    parse: function(res){
        return res;
    }
});