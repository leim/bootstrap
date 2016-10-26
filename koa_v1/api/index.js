/**
 * Created by MengLei on 2016-10-26.
 */
"use strict";
const Router = require('koa-router');


let router = new Router();

router.get('/test', function *(next) {
    result(this, {code: 900, msg: 'get test'});
});
router.post('/test', function *(next) {
    result(this, {code: 900, msg: 'post test'});
});

module.exports = router;
