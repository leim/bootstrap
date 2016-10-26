/**
 * Created by MengLei on 2016-10-26.
 */
"use strict";

module.exports = function (res, content, code) {
    //设置返回值头数据
    //console.log('res begin: ' + JSON.stringify(content));
    res.setHeader('ContentType', 'application/json;charset=UTF-8');
    res.setHeader('Cache-control', 'no-cache');
    if (!code) {
        switch (content.code) {
            case 900:
                res.statusCode = 200;
                break;
            case 904:
                res.statusCode = 404;
                break;
            case 905:
                res.statusCode = 500;
                break;
            default:
                res.statusCode = 400;
                break;
        }
    }
    res.end(JSON.stringify(content));
};


