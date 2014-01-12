var Marionette = require('marionette');

var MoreDealItem = Marionette.ItemView.extend({
    template: _.template(require('./item.html')),
    tagName: 'li'
}),

MoreDealList = Marionette.CompositeView.extend({
    tagName: 'dl',
    className: 'detail-list',
    template: _.template(require('./template.html')),   
    itemView: MoreDealItem,
    itemViewContainer:"ul"
});

module.exports = MoreDealList;
