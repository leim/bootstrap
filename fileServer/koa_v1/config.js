/**
 * Created by MengLei on 2016-09-14.
 */
"use strict";

exports.rootUrl = 'http://127.0.0.1:3000/';   //file server root url

exports.logType = 'dateFile';   //log输出类型，dateFile：文件，console：控制台日志

exports.logPath = './logs'; //日志路径

exports.port = 3000;    //http监听端口

exports.uploadNamePolicy = 'file';    //上传文件保存路径配置，file：保留原始文件名，rack：随机数路径

exports.overwrite = false;   //上传文件如果重名是否覆盖，true：覆盖，false：报错

