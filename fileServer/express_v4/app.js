var express = require('express');
var upload = require('./upload');
var fs = require('fs-extra');

var app = express();

//可以设置端口号
app.set('port', 3000);

//静态目录
var staticPath = require('path').join(__dirname, './public');
fs.ensureDirSync(staticPath);
app.use(express.static(staticPath));

//post方法上传文件
app.post('/upload', upload);

//测试页面
app.get('/test', function (req, res) {
    // show a file upload form
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        //'<input type="text" name="title"><br>' +
        '<input type="file" name="upload" multiple="multiple"><br>' +
        '<input type="submit" value="Upload">' +
        '</form>'
    );
});


//start http service
app.listen(app.get('port'), function () {
    console.log('file server http port listening on localhost: ' + app.get('port'));
});