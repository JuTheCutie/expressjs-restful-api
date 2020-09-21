const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.ObjectId;

var commentSchema = new Schema({
    _id: { type: objectId, auto: true },
    text: { type: String, required: true },
    isEdited: { type: Boolean, required: true },
    idUser: { type: objectId, ref: 'User', required: true },
    idTask: { type: objectId, ref: 'Task' },
    idProject: { type: objectId, ref: 'Project' },
    createdAt: { type: Date, default: Date.now }
});

var comment = mongoose.model('Comment', commentSchema, 'comment');

module.exports = comment;