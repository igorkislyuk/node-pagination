
// main function from file always receive 2 params
exports.route = function (req, res) {
    let limit = parseInt(req.body.limit);
    let offset = parseInt(req.body.offset);

    let validNumbers = Number.isInteger(offset) && Number.isInteger(limit);
    let undefinedValues = limit === undefined || offset === undefined;

    if (undefinedValues || !validNumbers) {
        res.status(400);
        res.end();
        return;
    }

    let sinceId = req.body.since_id;
    let tillId = req.body.till_id;

    if (sinceId === undefined && tillId === undefined) {
        // both are empty. Simple flow
        exports.database.simpleListing(offset, limit, function (result) {
            res.json(result);
            res.end();
        });
    } else {
        exports.database.listingInRange(offset, limit, sinceId, tillId, function (result) {
            res.json(result);
            res.end();
        })
    }
};