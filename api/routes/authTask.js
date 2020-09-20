var express = require('express');
var router = express.Router();
const keys = require('../key/key');
const utils = require('../bin/utils');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Task = require('../model/task');

//GET all tasks of verified token user id
router.get('/', utils.verifyToken, (req, res, next) => {

    //verify user token
    jwt.verify(req.token, keys.secretKey, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {            

            //Find all tasks from auth user
            Task.aggregate([
                { $lookup: { from: 'project', localField: 'idProject', foreignField: '_id', as: 'taskFromProject' } },
                { $match: { "taskFromProject.idUsers": ObjectId(authData.user._id) } }
            ]).then(data => {
                res.status(200).send({
                    success: true,
                    tasks: data
                });
            }).catch(err => {
                res.status(500).send({
                    success: false,
                    err: err
                });
            })

        }
    });

});

//GET all tasks from projectId of verified token user id

//GET task by taskId of verified token user id

//POST create a new task to verified user id project

//PUT Update task by taskId of verified token user id

//DELETE task by taskId of verified token user id 

module.exports = router;