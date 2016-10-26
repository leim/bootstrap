/**
 * Created by MengLei on 2016-10-25.
 */
"use strict";
var config = require('./config');
var path = require('path');
var fs = require('fs-extra');
var rack = require('hat').rack();
var result = require('./result');

module.exports = function (req, res) {
    //生成八位日期字符串
    var curDate = new Date();
    var year = curDate.getFullYear().toString();
    var month = (curDate.getMonth() + 1).toString();
    month = month.length < 2 ? '0' + month : month;
    var date = curDate.getDate().toString();
    date = date.length < 2 ? '0' + date : date;
    var dateStr = year + month + date;

    var staticPath = path.join(__dirname, './public');

    var filePath = '';
    if (config.keepFileName) {
        filePath = path.join('upload', dateStr, req.files.upload.name);  //文件名保留上传的名称
    } else {
        filePath = path.join('upload', dateStr, rack() + path.extname(req.files.upload.name).toLowerCase());   //文件名选择随机数
    }
    var destPath = path.join(staticPath, filePath);

    fs.move(req.files.upload.path, destPath, {clobber: config.overwrite}, function (err) {
        if (err) {
            //handle error
            console.log('upload file excption: ' + err.message);
            result(res, {statusCode: 905, message: err.message});
        } else {
            //success，输出结果使用正斜线，如果server运行在win系统下，则路径中分隔符是反斜线，此处要进行替换
            var outputPath = filePath.replace(/\\/g, '/');
            result(res, {statusCode: 900, filePath: config.rootUrl + outputPath});
            console.log('upload file success: ' + outputPath);
        }
    });
};

