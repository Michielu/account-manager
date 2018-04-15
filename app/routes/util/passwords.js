var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    hash(pwd) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(pwd, salt).then((hash) => {
                return {
                    hash: hash,
                    salt: salt
                }
            });
        });
    },

    compare(pwd, hash) {
        bcrypt.compare(pwd, hash, function (err, res) {
            // res == true
        });
    }
}