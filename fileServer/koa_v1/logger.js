/**
 * Created by MengLei on 2016-09-14.
 */
"use strict";
const log4js = require('log4js');
const path = require('path');
const config = require('./config');
const fs = require('co-fs-extra');

//ensure log file path
const logPath = path.join(__dirname, config.logPath);
fs.ensureDirSync(path.join(logPath));

//determine log type by NODE_ENV
let logType = config.logType;

//log appender configuration
log4js.configure({
    appenders: [{
        type: logType,
        filename: path.join(logPath, 'file.log'),
        pattern: '_MMddhh.log',
        alwaysIncludePattern: false,
        category: 'file'
    }, {
        type: 'console',
        category: 'console'
    }],
    replaceConsole: true
});

let logger = log4js.getLogger('console');
logger.file = log4js.getLogger('file');


module.exports = logger;
