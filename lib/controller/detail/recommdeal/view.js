var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
    template: _.template(require('./template.html')),
    tagName: "div"
});
