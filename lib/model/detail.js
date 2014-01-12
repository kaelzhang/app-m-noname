'use strict';

var Backbone = require('backbone');

var PromoDetail = module.exports = Backbone.Model.extend({
    initialize: function(param) {
        this.param = param;
        this.setUrl();
        this.fetch();
    },
    baseUrl: '/ajax/tuan/dealgn.json?',
    setUrl: function() {
        this.url = this.baseUrl + 'id=' + this.param.id + '&cityid=' + this.param.cityid;
    },
    parse: function(res){
        var data = res.data,
        photo = data.bigImageUrl,
        price = data.price.toString().indexOf('.')!==-1?(+data.price).toFixed(2):data.price,
        originalPrice = data.originalPrice,
        shortTitle = data.shortTitle,
        title = data.contentTitle,
        titleDesc = data.titleDesc,
        count = data.buyerCounter,
        remainCount = data.a || 0,
        shopStr = data.shopIdsStr,
        refund = data.refund,
        time = this.getTime(data),
        detailInfo = data.detailInfo,
        status = this.getDealStatus(data.status);
        time = this.getTime(data, status);

        var gotoUrl,nextUrl,originGoToUrl;
        var deals = data.dealSelects;
        if(deals.length==1){
            originGoToUrl = gotoUrl = '#order~g_'+data.id+'~d_'+deals[0].id;
        }else {
            originGoToUrl = gotoUrl = "#dealselect~g_"+data.id;
        }
        if(Weixin.isInWeixin()){
            var envConfig  = {
                'beta':{
                    cpsUrl:"http://tcps.51ping.com",
                    mmUrl:"http://mm.51ping.com",
                    appid:"wx1613983303fce900"
                },
                'online':{
                    cpsUrl:"http://cps.dianping.com",
                    mmUrl:"http://mm.dianping.com",
                    appid:"wx841a97238d9e17b2"
                }
            };
            var config = envConfig[ENV];
            gotoUrl = encodeURIComponent(config.mmUrl+'/weixin/?showwxpaytitle=1'+gotoUrl);
            nextUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+config.appid+'&redirect_uri='+config.cpsUrl+'/weiXinRedirect&response_type=code&scope=snsapi_base&state='+gotoUrl+'#wechat_redirect';
        }else {
            nextUrl = gotoUrl;
        }

        return{
            status: status,
            photo: photo,
            price: price,
            originalPrice: originalPrice,
            shortTitle: shortTitle,
            titleDesc:titleDesc,
            title: title,
            count: count,
            time: time,
            shopStr: shopStr,
            refund: refund,
            deals:data.dealSelects, //套餐
            detailInfo: detailInfo,
            nextUrl:nextUrl,
            originNextUrl:originGoToUrl
        }
    },
    getDealStatus: function(status) {
        if(DealStatus.isSellOut(status)) {
            return 1; //已卖光
        } else if(DealStatus.isEnd(status)) {
            return 2; //已结束
        } else if(DealStatus.isCantBuy(status)) {
            return 3; //无法购买
        } else if(DealStatus.isToBegin(status)) {
            return 4; //尚未开始
        } else {
            return 0; //正常
        }
    },
    getTime: function(data, status) {
        var time;
        if (status == 1 || status == 2 || status == 4) {
            var date = new Date(data.time)
            time = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
            if(status == 4) {
                time = "开始于" + time + date.getHours() + ":" + date.getMinutes();
            } else {
                time = "结束于" + time;
            }
        } else {
            var seconds = data.time - (new Date()).getTime(),
            days = seconds / 86400000;
            if( days >= 3) {
                time = "剩余3天以上";
            } else if(days >= 1 && days < 3) {
                time = "剩余" + parseInt(days) + "天";
            } else {
                var day = parseInt(days),
                hour = parseInt(seconds / 3600000 - day * 24),
                minute = parseInt(seconds / 60000 - day * 1440 - hour * 60);
                time = "剩余" + (day > 0 ? (day + "天") : "") + hour + "小时" + minute + "分";
            }
        }

        return time;
    }
});

