const http = require('http');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const database = require('./private/database.js');

const app = express();
app.use(bodyParser.json());

const databaseInstance = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root'
});

app.listen(3000, function () {
    console.log('Server running at port 3000');
});

app.get('/', function (req, res) {
    res.end('Please, use POST method');
});

app.post('/message/create', function (req, res) {
    const author = req.body.author || null;
    const text = req.body.text || null;

    if (author !== null && text !== null) {
        database.createMessage(databaseInstance, author, text, function (err) {
            if (err) {
                throw err;
                res.status(400);
            } else {
                res.status(200);
            }
            res.end();
        });
    } else {
        res.status(400);
        res.end();
    }
});

app.post('/message/listing', function (req, res) {
    const limit = parseInt(req.body.limit);
    const offset = parseInt(req.body.offset);

    const validNumbers = Number.isInteger(offset) && Number.isInteger(limit);
    const undefinedValues = limit === undefined || offset === undefined;

    if (undefinedValues || !validNumbers) {
        res.status(400);
        res.end();
        return;
    }

    const sinceId = req.body.since_id;
    const tillId = req.body.till_id;

    if (sinceId === undefined && tillId === undefined) {
        // both are empty. Simple flow
        database.simpleListing(databaseInstance, offset, limit, function (result) {
            res.json(result);
            res.end();
        });
    } else {
        database.listingInRange(databaseInstance, offset, limit, sinceId, tillId, function (result) {
            res.json(result);
            res.end();
        })
    }

});







