const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.ObjectId;

var userSchema = new Schema({
    _id: { type: objectId, auto: true },
    nickname: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

var user = mongoose.model('User', userSchema, 'user');

module.exports = user;