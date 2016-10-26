/**
 * Created by MengLei on 2016-10-26.
 */
"use strict";
module.exports = function (ctx, content, code) {
    ctx.set('Content-Type', 'application/json;charset=UTF-8');
    ctx.set('Cache-control', 'no-cache');
    if (!code) {
        switch (content.code) {
            case 900:
                ctx.status = 200;
                break;
            case 904:
                ctx.status = 404;
                break;
            case 905:
                ctx.status = 500;
                break;
            default:
                ctx.status = 400;
                break;
        }
    } else {
        ctx.status = code || 200;
    }
    // ctx.status = 200;
    ctx.body = content;
};

