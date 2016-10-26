/**
 * Created by MengLei on 2016-10-26.
 */
"use strict";
const CronJob = require('cron').CronJob;

if (!process.env.NODE_ENV) {
    return;
}

//new CronJob('0 0 0 * *', cronFunc, null, true);  //cron task
