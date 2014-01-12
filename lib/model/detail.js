'use strict';

var Backbone = require('backbone');

var FORMAT = {

} 

var detail = module.exports = Backbone.Model.extend({
    initialize: function(param) {
        this.param = param;
        this.setUrl();
        this.fetch();
    },
    baseUrl: '/activity/activityDetailAction',
    setUrl: function() {
        this.url = this.baseUrl + '?id=' + this.param.id;
    },

    parse: function(res){
        return res;
    }
});

// detail.set({
//     title: 'title',
//     pic_url: 'http://t1.s2.dpfile.com/pc/mc/971d00681388ad65ccdb49c785f789e7(450x280)/thumb.jpg',
//     browses: 1234,
//     create_time: '2013-02-12 12:30',
//     expires: 2222
// });



// <div class="promo-feature">
//     <img class="img" src="<%= pic_url %>" height="auto" width="100%"></img>
//     <div class="title"><h1><%= title %></h1></div>
// </div>
// <ul class="promo-info Fix">
//     <li><i class="icon-<%= refund ? 'y"></i>' : 'n"></i>不' %>支持随时退</li>
//     <li><i class="icon-<%= refund ? 'y"></i>' : 'n"></i>不' %>支持过期退</li>
//     <li><%= browses %>人浏览</li>
//     <li><%= create_time %>发布时间</li>
//     <li><%= expires %> 后过期</li>
// </ul>