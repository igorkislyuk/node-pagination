const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const database = require('./local/database/index.js');

// express
const app = express();
app.use(bodyParser.json());

// routes
const routes = require('local_routes');

// port configuration
const port = 3000;

app.listen(port, function () {
    database.sync();
    console.log('Server running at port 3000');
});

app.get('/', routes.default);

app.post('/message', routes.message.default);
app.post('/message/create', routes.message.create);
app.post('/message/listing', routes.message.listing);







