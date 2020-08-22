const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
    username: { type: String, required: true, unique: true},
    firstname: {type: String},
    familyname: {type: String},
    email: { type: String, required: true},
    password: { type: String, required: true},
    job: {type: String, default: 'Staff'},
    phone: {type: String, default: '090'},
    address: {type: String, default: '123 Street, Ward, District, HCM City'}
}, { collection: 'users' })

users.index({ username: 1}) //Nơi đánh index
module.exports = mongoose.model('users', users)