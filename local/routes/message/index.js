
exports.default = function (req, res) {
    res.end('Cannot /message');
};

exports.create = require('./create');
exports.listing = require('./listing');