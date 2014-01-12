define(function(require, exports, module){
    var App = window.WeiXinApp,
        View = require("./view"),
        Detail = require("entities/detail");
        
    module.exports = Marionette.Controller.extend({
        initialize: function(param) {

            var self = this,
                collection = new Detail.MoreCollection(param);

            collection.once("reset",_.bind(function(data){
                if(collection.length > 0) {

                    var model = new Detail.DetailModel(param),
                        view = new View({
                            model: model,
                            collection: collection
                        });
                        
                    model.fetch();

                    model.once("change",_.bind(function(data){
                        this.region.show(view);
                    },this));

                    view.once("dom:refresh", function() {
                        self.initIscroll();
                    });
                }
            },this));
        },

        show: function(region, initIscroll, id) {
            this.region = region;
            this.initIscroll = initIscroll;
        }
    });
});
