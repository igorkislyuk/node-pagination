let uuidV4 = require('uuid/v4');
let Sequelize = require('sequelize');
let DataTypes = Sequelize.DataTypes;


let sequelize = new Sequelize('Node', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 1,
        min: 0,
        idle: 10000
    }
});


let Message = sequelize.define('message', {
    id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


// exports
exports.Model = Message;

exports.sync = function () {
    Message.sync();
};

exports.simpleListing = function (db, offset, limit, callback) {
    // const query =
    //     "SELECT messages.id, messages.author, messages.text, messages.date FROM Node.messages" +
    //     " ORDER BY messages.date DESC" +
    //     " LIMIT " + limit +
    //     " OFFSET " + offset;
    //
    // db.query(query, function (err, rows) {
    //         if (err) throw err;
    //         parseData(rows, callback);
    //     }
    // );
    Message
        .findAll({})
        .then(messages => {
            parseData()
        })
        .catch(error => {

            // todo html page with error code
            console.log(error);
        })
};

function parseData(rows, callback) {
    let result = [];

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

exports.createMessage = function (author, text, callback) {

    Message
        .create({
            id: uuidV4(),
            text: text,
            date: new Date(),
            author: author
        })
        .then(msg => {
            console.log('Message was successfully create with id = ' + msg.id);
            callback(err);
        })
        .catch(err => {
            // todo page
            console.log(err);
        });
};
