/**
 * Created by MengLei on 2016-10-26.
 */
"use strict";
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const config = require('./../../config');

mongoose.connect(config.dbString, err=> {
    if (err) {
        console.error(`connect to mongodb error: ${err.message}`);
        process.exit(1);
    }
});

mongoose.Promise = require('bluebird');

walkdir(__dirname).forEach(item=> {   //walk the whole dirs and requires all the model files
    if (path.extname(item) == '.js' && path.basename(item) != 'index.js' && path.basename(item) != 'baseModel.js') {
        require(item);
    }
});

module.exports = mongoose.models;   //exports all the models

//walk dirs
function walkdir(pa) {
    pa = path.resolve(pa);
    let list = [];
    walk(pa);
    function walk(pa) {
        let s = fs.lstatSync(pa);
        if (!s.isDirectory()) {
            return list.push(pa);
        }
        fs.readdirSync(pa).forEach(item=> {
            walk(path.join(pa, item));
        });
    }

    return list;
}