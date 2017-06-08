
// main
// todo: define how assign single function to whole `exports`
exports.route = function (req, res) {
    let author = req.body.author || null;
    let text = req.body.text || null;

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
};