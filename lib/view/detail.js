'use strict';

var Marionette = require('marionette');
var _ = require('underscore');

var DetailView = Marionette.ItemView.extend({
    template: _.template(require('./detail.html')),
    tagName: 'div',
    className: 'promo-detail'
});

module.exports = DetailView;