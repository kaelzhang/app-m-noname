'use strict';

var Marionette = require('marionette');
var _ = require('underscore');

var ItemView = Marionette.ItemView.extend({
    template: _.template(require('./list.html')),
    tagName: "li"
});

var ListView = Marionette.CollectionView.extend({
    itemView: ItemView,
    tagName: "ul",
    className: "indexlist"
});

module.exports = ListView;