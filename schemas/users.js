/**
 * Created by pc on 2017/10/23.
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

