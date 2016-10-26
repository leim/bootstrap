/**
 * Created by MengLei on 2016-10-26.
 */
"use strict";
const log4js = require('log4js');
const path = require('path');
const fs = require('fs-extra');

//ensure log file path
const logPath = path.join(__dirname, '../public', 'logs');
fs.ensureDirSync(path.join(logPath));

//determine log type by NODE_ENV
let logType = !!process.env.NODE_ENV ? 'dateFile' : 'console';

//log appender configuration
log4js.configure({
    appenders: [
        {
            type: logType,
            filename: path.join(logPath, 'http.log'),
            pattern: '_MMddhh.log',
            alwaysIncludePattern: false,
            category: 'http'
        }, {
            type: 'console',
            category: 'console'
        }],
    replaceConsole: true
});

let logger = log4js.getLogger('console');
logger.http = log4js.getLogger('http');

module.exports = logger;


