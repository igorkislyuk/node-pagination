
// main
function main(_, res) {
    res.end('Please, use POST method');
}

// todo: check what Router is from petropavel13
exports.default = main;

exports.message = require('local_message');
