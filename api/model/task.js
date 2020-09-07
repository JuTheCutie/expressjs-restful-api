const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.ObjectId;

var taskSchema = new Schema({
    _id: { type: objectId, auto: true },
    body: { type: String, required: true },
    priority: { type: Boolean, required: true },
    schedule: { type: Date, required: true },
    idProject: { type: objectId, ref: 'Project', required: true },
    createdAt: { type: Date, default: Date.now }
});

var task = mongoose.model('Task', taskSchema, 'task');

module.exports = task;