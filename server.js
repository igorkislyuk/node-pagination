let http = require('http');
let express = require('express');
let bodyParser = require('body-parser');
let database = require('./private/database.js');

// express
let app = express();
app.use(bodyParser.json());

// routes
let defaultRoute = require('./routes/default.js');
let listingRoute = require('./routes/message/listing.js');
let createRoute = require('./routes/message/create');

let port = 3000;

app.listen(port, function () {
    database.sync();
    console.log('Server running at port 3000');
});

app.get('/', defaultRoute.route);
app.post('/message/create', createRoute.route);
app.post('/message/listing', listingRoute.route);







