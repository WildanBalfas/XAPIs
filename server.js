'use strict';

const restify = require('restify');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
const corsMiddleWare = require('restify-cors-middleware');

/*
/ Menentukan Nama Server Dan Versi Server
*/
const server = restify.createServer({
    name: 'X Kitchen Project',
    version: '1.0.0'
});

server.use(restify.plugins.bodyParser());

const cors = corsMiddleWare({
    origins: ['*'],
    allowHeaders: ['X-App-Version'],
    exposeHeaders: []
});

server.pre(cors.preflight);
server.use(cors.actual);

server.get('/', (req, res, next) => {
    var html = '<html><head><title>Some Title</title></head><body><h1>LiveCode</h1></body></html>';

    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(html),
        'Content-Type': 'text/html'
    })

    res.write(html);
    res.end;
});

/*
/ Route
/ Components Route
*/
// require('./components/categories')(server);
// require('./components/orders')(server);
// require('./components/products')(server);
// require('./components/tables')(server);
// require('./components/users')(server);

//test route
require('./components/controllers/template.controller')(server, 'test');

//users
require('./components/controllers/users.controller')(server);
//categories
require('./components/controllers/template.controller')(server, 'categories');
//tables
require('./components/controllers/template.controller')(server, 'tables');
//products
require('./components/controllers/products.controller')(server);
//product insert
// require('./components/controllers/template.controller')(server, 'products');

global.config = require('./components/configurations/config');

// server.get('/api', (res) => {
//     res.json({
//        message: 'Welcome'
//     });
// });

// server.post('/api/posts', verifyToken, (req, res, next) => {

//    jwt.verify(req.token, 'secretkey', (err, authData) => {
//        if(err){
//            return next(new Error(err));
//        }else{
//            res.json({
//                message: 'Post Created',
//                authData
//             });
//        }
//    });
   
// });

// server.get('/api/posts', verifyToken, (req, res, next) => {

//    jwt.verify(req.token, 'secretkey', (err, authData) => {
//        if(err){
//            return next(new Error(err));
//        }else{
//            res.json({
//                message: 'Post Created',
//                authData
//             });
//        }
//    });
   
// });

// server.post('/api/login', (req, res, next) => {
//    const user = {
//        id: 1,
//        username: 'tisufa',
//        email: 'titus@sentuh.net'
//    }
//    jwt.sign({user}, 'secretkey', (err, token) => {
//        res.json({
//            token
//        });
//    });
// });

/**
* Format Of Token
* Authorization: Bearer <access_token>
* Verify Tokens
*/
// function verifyToken(req, res, next){
//    /**
//     * Get auth header value
//     */
//    const bearerHeader = req.headers['authorization'];
//    // Check if bearer is undefined
//    if(typeof bearerHeader !== 'undefined'){
//        // Split at the space
//        const bearer = bearerHeader.split(' ');
//        // Get token from array
//        const bearerToken = bearer[1];
//        // set the token
//        req.token = bearerToken;
//        // Next middleware
//        next();
//    }else{
//        // FOrbidden
//        res.json({
//            message: 'forbidden'
//        });
//    }
// }

server.listen(config.port, function () {
    console.log('%s listen at %s', server.name, server.url);
});