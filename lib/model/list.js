'use strict';

var Backbone = require('backbone');

var Collection = Backbone.Collection.extend({
    initialize: function(param) {
        this._param = param;
        this.setUrl();
        this.fetch();
    },
    baseUrl: '/activity/activityListAction',
    setUrl: function() {
        this.url = this.baseUrl + '?lat=' + this._param.lat + '&lng=' + this._param.lng;
    },

    parse: function(res){
        return res;
    }
});

module.exports = Collection;
