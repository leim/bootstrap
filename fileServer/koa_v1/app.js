/**
 * Created by MengLei on 2016-09-14.
 */
"use strict";
const app = require('koa')();
const path = require('path');
const http = require('http');
const router = require('koa-router')();
const port = require('./config').port;
const koaBody = require('koa-body');
const upload = require('./upload');

const kstatic = require('koa-static');

app.use(function *(next) {
    try {
        yield next;
    } catch (ex) {
        result(this, {code: 905, msg: `服务器内部错误，${ex.message}`});
    }
    if (!this.body) {
        result(this, {code: 904, msg: '请求的资源不存在！'});
    }
    logger.trace(`method: ${this.method}, code: ${this.body.code || ''}, path: ${this.path}`);
});

app.use(kstatic(path.join(__dirname, './public'))); //上传文件存放路径
app.use(router.routes());
router.post('/upload', koaBody({multipart: true}), upload);

//测试页面
router.get('/test', function *() {
    // show a file upload form
    this.status = 200;
    this.set('content-type', 'text/html;charset=UTF-8');
    this.body = `<form action="/upload" enctype="multipart/form-data" method="post">
        <input type="file" name="upload" multiple="multiple"><br>
        <input type="submit" value="Upload">
        </form>`;
});

http.createServer(app.callback()).listen(port, err=> {
    if (err) {
        return console.log(`file server init error: ${err.message}`);
    }
    console.log(`file server listening at port: ${port}`);
});

//import some global method
global.result = require('./result');
global.logger = require('./logger').file;
