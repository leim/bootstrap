/**
 * Created by MengLei on 2016-10-26.
 */
"use strict";
exports.port = 3000;

//mongodb connection string
exports.dbString = process.env.NODE_ENV == 'production' ? 'mongodb://prod:demo@mongo.example.com:27017/prod' : process.env.NODE_ENV == 'test' ? 'mongodb://test:demo@mongo.example.com:27017/test' : 'mongodb://127.0.0.1:27017/test';

let redisConfig = {
    host: '127.0.0.1',
    port: 6379
};
exports.redisConfig = redisConfig;   //redis config

exports.rack = require('hat').rack;   //random number generator


