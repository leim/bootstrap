/**
 * Created by MengLei on 2016-09-14.
 */
"use strict";
const rack = require('hat').rack();
const path = require('path');
const fs = require('co-fs-extra');
const config = require('./config');

module.exports = function *() {
    let dateStr = genDateStr();
    let fileName = this.request.body.files.upload.name;
    let tmpPath = this.request.body.files.upload.path;
    let filePath = config.uploadNamePolicy == 'rack' ? path.join('upload', dateStr, rack() + path.extname(fileName).toLowerCase()).replace(/\\/g, '/') : path.join('upload', dateStr, fileName.toLowerCase()).replace(/\\/g, '/');
    let opt = {
        clobber: config.overwrite
    };
    try {
        yield fs.move(tmpPath, path.join(__dirname, 'public', filePath), opt);
    } catch (ex) {
        if (ex.message.indexOf('EEXIST') >= 0) {
            return result(this, {code: 905, msg: '上传文件失败，文件已存在，请选择更换文件名！'});
        } else {
            throw(ex);
        }
    }
    return result(this, {code: 900, filePath: config.rootUrl + filePath});
};


function genDateStr(t) {
    if (!t) {
        t = Date.now();
    }
    //生成八位日期字符串
    let curDate = new Date(t);
    let month = (curDate.getMonth() + 1).toString();
    let date = curDate.getDate().toString();
    return `${curDate.getFullYear().toString()}-${month.length < 2 ? '0' + month : month}-${date.length < 2 ? '0' + date : date}`;
}
