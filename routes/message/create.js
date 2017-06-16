const database = require('database');

function main(req, res) {
    const author = req.body.author || null;
    const text = req.body.text || null;

    if (author !== null && text !== null) {
        database.createMessage(author, text, function (err) {
            if (err) {
                res.status(400);
                res.end();

                throw err;
            } else {
                res.status(200);
            }
            res.end();
        });
    } else {
        res.status(400);
        res.end();
    }
}

module.exports = main;
