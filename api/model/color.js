const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.ObjectId;

var colorSchema = new Schema({
    _id: { type: objectId, auto: true },
    name: { type: String, required: true },
    hexCode: { type: String, required: true }
});

var color = mongoose.model('Color', colorSchema, 'color');

module.exports = color;