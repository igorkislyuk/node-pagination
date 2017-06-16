const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const database = require('./database/index.js');

// express
const app = express();
app.use(bodyParser.json());

// routes
const defaultRoute = require('./routes/default.js');

const listingRoute = require('./routes/message/listing.js');
listingRoute.database = database;

const createRoute = require('./routes/message/create');
createRoute.database = database;

const port = 3000;

app.listen(port, function () {
    database.sync();
    console.log('Server running at port 3000');
});

app.get('/', defaultRoute);
app.post('/message/create', createRoute);
app.post('/message/listing', listingRoute);







