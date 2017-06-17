// common
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

// locals
const database = require('local_database');

// express
const app = express();
app.use(bodyParser.json());

// routes
const routes = require('local_routes');

// configuration
const mode = process.env.NODE_ENV || 'development';
const config = require('./config.json')[mode];

// main
app.listen(config.port, function () {
    database.sync();
    console.info('Server running at port ' + config.port);
});

app.get('/', routes.default);

app.post('/message', routes.message.default);
app.post('/message/create', routes.message.create);
app.post('/message/listing', routes.message.listing);







