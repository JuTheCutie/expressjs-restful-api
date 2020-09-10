const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.ObjectId;

var projectSchema = new Schema({
    _id: { type: objectId, auto: true },
    name: { type: String, required: true },
    idColor: { type: objectId, ref: 'Color', required: true },
    idUsers: [{ type: objectId, ref: 'User', required: true }],
    createdAt: { type: Date, default: Date.now }
});

var project = mongoose.model('Project', projectSchema, 'project');

module.exports = project;