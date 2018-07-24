const restify = require('restify');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');


const server = restify.createServer({
    name: 'X Kitchen Project',
    version: '1.0.0'
});

server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: true }));
server.use(function(req,res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Method", "GET, POST, DELETE, OPTIONS, PUT");
    next();
});

// require('./components/categories')(server, {});


global.config = require('./components/configurations/config');


// Database Name
const dbName = 'myproject';

MongoClient.connect(config.dbconn, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    require('./components/categories')(server, db);

  });
server.listen(config.port, function () {
    console.log('%s listen at %s', server.name, server.url);
});


