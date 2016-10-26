/**
 * Created by MengLei on 2016-10-25.
 */
"use strict";
var express = require('express');
var upload = require('./upload');
var fs = require('fs-extra');
var config = require('./config');
var app = express();

app.use(express.bodyParser());  //integrated body parse, removed in express v4

var staticPath = require('path').join(__dirname, './public');
fs.ensureDir(staticPath);
app.use(express.static(staticPath));

//post upload
app.post('/upload', upload);

//test page
app.get('/test', function (req, res) {
    // a simple upload form
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        //'<input type="text" name="title"><br>' +
        '<input type="file" name="upload" multiple="multiple"><br>' +
        '<input type="submit" value="Upload">' +
        '</form>'
    );
});

app.listen(config.port, function () {
    console.log('server listen at: ' + config.port);
});

