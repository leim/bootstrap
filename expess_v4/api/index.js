/**
 * Created by MengLei on 2016-10-26.
 */
"use strict";
var router = require('express').Router();

router.get('/test', (req, res)=> {
    result(res, {code: 900, msg: 'get test'});
});

router.post('/test', (req, res)=> {
    result(res, {code: 900, msg: 'post test'});
});

module.exports = router;
