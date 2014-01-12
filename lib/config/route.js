'use strict';

module.exports = {
    '': {
        appjs: ['./pages/list'],
        method: 'show'
    },

    'detail/:id': {
        appjs: ['./pages/detail'],
        method: 'show'
    }
};