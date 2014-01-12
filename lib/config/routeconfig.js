module.exports = {
    "":{
        pv:{
            pageId:'172001'
        },
        share:{
            title:'点评团·放心团',
            desc:'吃喝玩乐，应有尽有，随时随地，想团就团，快来试试吧！'
        },
        appjs:['./pages/index'],
        method:"show"
    },

    "detail/:id":{
        appjs: ["./pages/detail"],
        method: "show"
    },
};
