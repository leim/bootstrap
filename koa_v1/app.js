/**
 * Created by MengLei on 2016-10-26.
 */
"use strict";
const app = require('koa')();
const http = require('http');
const path = require('path');
const qs = require('qs');
const config = require('./config');
const Router = require('koa-router');
const api = require('./api');

app.use(function *(next) {
    if (this.path.indexOf('/api') == 0) {  //only log api request
        try {
            yield next;
        } catch (ex) {
            result(this, {code: 905, msg: `internal server error: ${ex.message}`});
        }
        if (!this.body) {
            result(this, {code: 904, msg: `not found`});
        }
        //file logger
        logger.trace(`method: ${this.method}, status: ${this.status}, code: ${this.body.code + `${this.body.code != 900 ? ', msg: ' + this.body.msg : ''}`}, path: ${this.path}, has_auth: ${!!this.header.auth}, query: ${JSON.stringify(this.query)}, body: ${JSON.stringify(this.request.body)}`);
        //db logger
        if (!!process.env.NODE_ENV) {
            // add logs to database
        }
    } else {
        yield next;
    }
});

app.use(function *(next) {
    //为了兼容某些不标准的content-type，将最末尾的分号去除掉，这是之前调试接口的时候遇到的一个巨坑
    if (this.header['content-type']) {
        if (this.header['content-type'].lastIndexOf(';') == this.header['content-type'].length - 1) {
            this.header['content-type'] = this.header['content-type'].substr(0, this.header['content-type'].length - 1);
        }
    }
    yield next;
});

app.use(require('koa-static')(path.join(__dirname, 'public'))); //static path

//route all "/api" request to api
let router = new Router();
router.use('/api', require('koa-body'), api.routes());
app.use(router.routes());

//start server
http.createServer(app.callback()).listen(config.port, '127.0.0.1', err=> {
    if (err) {
        return console.log(`http server init error: ${err.message}`);
    }
    logger.fatal(`http server listening at port: ${config.port}`);
    console.log(`http server listening at port: ${config.port}`);
});

//graceful exit with closing db connection
process.on('SIGINT', ()=> {
    require('mongoose').disconnect();
    logger.fatal('server exit.');
    console.log('[FATAL] server exit.');
    process.exit(1);
});

//on start, init some task
require('./utils/task');   //task on app start

//import some global method
global.validator = require('validator');    //字符校验
global.proxy = require('./common/proxy/index');  //mount all the proxies to global
global.result = require('./utils/result');   //mount common result handle to global
global.logger = require('./utils/logger').http;   //mount common logger to global
