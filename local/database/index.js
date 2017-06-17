const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

// config
const mode = process.env.NODE_ENV || 'development';
const config = require('./config.json')[mode];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        idle: config.pool.idle
    }
});


const Message = sequelize.define('message', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
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
}, {
    indexes: [
        {
            name: 'date_index',
            fields: ['date']
        }
    ]
});


// exports

exports.sync = function () {
    Message.sync();
};

exports.simpleListing = function (offset, limit, callback) {
    Message
        .findAll({
            limit: limit,
            offset: offset,
            order: [
                ['date', 'DESC']
            ]
        })
        .then(messages => {
            parseData(messages, callback);
        })
        .catch(error => {
            console.log(error);
            callback([]);
        })
};

exports.listingInRange = function (offset, limit, since_id, till_id, callback) {

    if (isNaN(offset) || isNaN(limit)) {
        parseData([], callback);
    }

    const data = {};
    data.callback = callback;
    data.limit = limit;
    data.offset = offset;

    const isValidSinceID = since_id !== undefined;
    const isValidTillID = till_id !== undefined;

    if (isValidSinceID && isValidTillID) {

        listingForBothAnchors(since_id, till_id, callback);

    } else if (isValidSinceID && !isValidTillID) {

        data.isSinceAnchor = true;
        data.identifier = since_id;
        listingForOneAnchor(data);

    } else if (!isValidSinceID && isValidTillID) {
        data.isSinceAnchor = false;
        data.identifier = till_id;

        listingForOneAnchor(data);
    }
    else {
        // simple paging
        exports.simpleListing(offset, limit, callback);
    }
};

exports.createMessage = function (author, text, callback) {

    Message
        .create({
            text: text,
            date: new Date(),
            author: author
        })
        .then(msg => {
            console.log('Message was successfully create with id = ' + msg.id);
            callback();
        })
        .catch(err => {
            console.log(err);
        });
};

// Inner functions

function parseData(messages, callback) {
    const result = [];

    for (const i in messages) {
        const message = messages[i];

        const data = {
            id: message.id,
            author: unescape(message.author),
            text: unescape(message.text),
            date: message.date
        };

        result.push(data);
    }

    callback(result);
}

function listingForBothAnchors(since_id, till_id, callback) {
    Message
        .findAll({
            where: {
                $or: [
                    {
                        id: since_id
                    },
                    {
                        id: till_id
                    }
                ]
            }
        })
        .then(boundaries => {
            if (boundaries.length !== 2) {
                console.log('Bad request for anchors');
                return;
            }

            if (boundaries[0].id === since_id) {
                return {
                    till_date: boundaries[1].date,
                    since_date: boundaries[0].date
                };
            } else {
                return {
                    till_date: boundaries[0].date,
                    since_date: boundaries[1].date
                };
            }
        })
        .then(result => {
            return Message
                .findAll({
                    where: {
                        date: {
                            $and: {
                                $lte: result.till_date,
                                $gte: result.since_date
                            }
                        }
                    },
                    order: [
                        ['date', 'ASC']
                    ]
                })
        })
        .then(messages => {
            parseData(messages, callback);
        })
        .catch(error => {
            console.log(error);
            parseData([], callback);
        })
}

function listingForOneAnchor(data) {
    Message
        .find({
            where: {id: data.identifier}
        })
        .then(message => {
            const date = data.isSinceAnchor ? {$gte: message.date} : {$lte: message.date};

            return Message
                .findAll({
                    where: {date: date},
                    order: [['date', 'ASC']],
                    limit: data.limit,
                    offset: data.offset
                })
        })
        .then(messages => {
            parseData(messages, data.callback);
        })
        .catch(error => {
            console.log(error);
        })
}
