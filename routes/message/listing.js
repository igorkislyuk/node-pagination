const database = require('database');

// main function from file always receive 2 params
function main(req, res) {

    const limit = parseInt(req.body.limit);
    const offset = parseInt(req.body.offset);

    const sinceId = req.body.since_id;
    const tillId = req.body.till_id;

    database.listingInRange(offset, limit, sinceId, tillId, function (result) {
        res.json(result);
        res.end();
    });
}

module.exports = main;
