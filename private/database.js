exports.simpleListing = function (db, offset, limit, callback) {
    const query =
        "SELECT messages.id, messages.author, messages.text, messages.date FROM Node.messages" +
        " ORDER BY messages.date DESC" +
        " LIMIT " + limit +
        " OFFSET " + offset;

    db.query(query, function (err, rows) {
            if (err) throw err;
            parseData(rows, callback);
        }
    );
};

function parseData(rows, callback) {
    var result = [];

    for (const i in rows) {
        const row = rows[i];

        const data = {
            id: row.id,
            author: unescape(row.author),
            text: unescape(row.text),
            date: row.date
        };

        result.push(data);
    }

    callback(result);
}

exports.listingInRange = function (db, offset, limit, since_id, till_id, callback) {

    var query =
        "SELECT messages.id, messages.author, messages.text, messages.date" +
        " FROM Node.messages";

    if (since_id !== undefined && till_id !== undefined) {
        query += " WHERE messages.id < " + since_id + " AND messages.id > " + till_id + " ORDER BY messages.id DESC";
    } else {
        if (since_id !== undefined) {
            query += " WHERE messages.id < " + since_id;
        } else {
            query += " WHERE messages.id > " + till_id;
        }
        query += " ORDER BY messages.id DESC" + " LIMIT " + limit + " OFFSET " + offset;
    }

    db.query(query, function (err, rows) {
            if (err) throw err;
            parseData(rows, callback);
        }
    );
};

exports.createMessage = function (db, author, text, callback) {
    const query =
        "INSERT INTO Node.messages" +
        " (`text`,`author`,`date`)" +
        " VALUES " +
        "('" + escape(text) + "', '" + escape(author) + "', CURTIME())";

    db.query(query, function (err) {
        callback(err);
    });
};
