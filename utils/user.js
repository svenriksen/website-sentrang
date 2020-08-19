const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
    username: { type: String, required: true, unique: true},
    firstname: {type: String},
    familyname: {type: String},
    email: { type: String, required: true},
    password: { type: String, required: true}
}, { collection: 'users' })

users.index({ username: 1}) //Nơi đánh index
module.exports = mongoose.model('users', users)