'use strict';

var Backbone = require('backbone');

var Collection = Backbone.Collection.extend({
    initialize: function(param) {
        this.param = param;
        this.setUrl();
        this.fetch();
    },
    baseUrl: '/activity/activityListAction',
    setUrl: function() {
        this.url = this.baseUrl + '?lat=' + this.param.lat + '&lng=' + this.param.lng;
    },

    parse: function(res){
        return res;
    }
});

module.exports = Collection;
