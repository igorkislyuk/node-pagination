
// main function from file always receive 2 params
exports.route = function (req, res) {

    let limit = parseInt(req.body.limit);
    let offset = parseInt(req.body.offset);

    let sinceId = req.body.since_id;
    let tillId = req.body.till_id;

    exports.database.listingInRange(offset, limit, sinceId, tillId, function (result) {
        res.json(result);
        res.end();
    });
};