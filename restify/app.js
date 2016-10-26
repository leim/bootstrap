/**
 * Created by MengLei on 2016-10-25.
 */
"use strict";

const restify = require('restify');
const config = require('./config');

const server = restify.createServer({   //create a server
    // certificate: fs.readFileSync('/path/to/server/certificate'),   //https config
    // key: fs.readFileSync('/path/to/server/key'),
    name: 'bootstrap_demo',  //app name config
    version: '1.0.0'    //app version config
});

server.pre((req, res, next)=> {
    //do something before routing occurs like changing request headers.
    return next();
});

server.use((req, res, next)=> {
    //middleware, do something no matter what the route is, handlers can be single function or array of functions.
    return next();
});

server.use(restify.acceptParser(server.acceptable));  //parse the accept header
server.use(restify.CORS());   //supports cors header
server.use(restify.dateParser(60));  //parse http date header
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.get('static', restify.serveStatic({directory: './public', file: 'index.html'}));   //static files in public

//handle routes
server.get('/echo/:name', function (req, res, next) {
    res.send(req.params);
    return next();
});
function send(req, res, next) {
    res.send('hello ' + req.params.name);
    return next();
}

server.post('/hello', function create(req, res, next) {
    res.send(201, Math.random().toString(36).substr(3, 8));
    return next();
});
server.put('/hello', send);
server.get('/hello/:name', (req, res, next)=> {
    next('test2');
});

server.head('/hello/:name', send);
server.del('hello/:name', function rm(req, res, next) {
    res.send(204);
    return next();
});
// server.get({name: 'test', path: '/hello/:name'}, (req, res, next)=> {
//     next('test2');
// });
server.get({name: 'test2', path: '/hello/:name'}, (req, res, next)=> {
    res.send(201);
    next();
});
// server.get(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/, function(req, res, next) {
//     console.log(req.params[0]);
//     console.log(req.params[1]);
//     res.send(200);
//     return next();
// });

server.listen(config.port, '0.0.0.0', function () {
    console.log('%s listening at %s', server.name, server.url);
});


