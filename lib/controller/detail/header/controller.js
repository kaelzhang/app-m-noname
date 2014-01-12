var Backbone = require('backbone');
var View = require("./view");
module.exports = {
    show: function(region, canReturn) {
        region.show(new View({
            model:new Backbone.Model({
                canReturn: canReturn
            })
        }));
    }
};
