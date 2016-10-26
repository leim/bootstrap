/**
 * Created by MengLei on 2016-10-26.
 */
"use strict";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config');
const http = require('http');
const api = require('./api');

const app = express();
app.disable('x-powered-by');        //disable x-powered-by header in http response

app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', api);

http.createServer(app).listen(config.port, '0.0.0.0', err=> {
    if (err) {
        return console.log(`app server init error: ${err.message}`);
    }
    logger.fatal(`app server listening at: ${config.port}`);
    console.log(`app server listening at ${config.port}`);
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
