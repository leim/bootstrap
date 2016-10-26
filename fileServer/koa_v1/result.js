/**
 * Created by MengLei on 2016-09-14.
 */
"use strict";
module.exports = function (ctx, content, code) {
    ctx.set('Content-Type', 'application/json;charset=UTF-8');
    ctx.set('Cache-control', 'no-cache');
    ctx.status = code || 200;
    ctx.body = content;
};
