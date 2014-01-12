var Marionette = require('marionette');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
    template: _.template(require('./template.html')),
    tagName: "div"
});
