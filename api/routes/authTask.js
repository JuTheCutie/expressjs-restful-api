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
            res.status(403).send({
                success: false,
                err: err
            });
        } else {            

            //Find all tasks from auth user
            Task.aggregate([
                { $lookup: { from: 'project', localField: 'idProject', foreignField: '_id', as: 'taskFromProject' } },
                { $match: { "taskFromProject.idUsers": ObjectId(authData.user._id) } },
                { $lookup: { from: 'color', localField: 'taskFromProject.idColor', foreignField: '_id', as: 'colorOfProject' } },
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

//GET task by taskId of verified token user id
router.get('/:id', utils.verifyToken, (req, res, next) => {

    var idTask = req.params.id;

    jwt.verify(req.token, keys.secretKey, (err, authData) => {
        if (err) {
            res.status(403).send({
                success: false,
                err: err
            });
        } else {
            
            Task.aggregate([
                { $match: { _id: ObjectId(idTask) } },
                { $lookup: { from: 'project', localField: 'idProject', foreignField: '_id', as: 'taskFromProject' } },
                { $match: { "taskFromProject.idUsers": ObjectId(authData.user._id) } },
                { $lookup: { from: 'color', localField: 'taskFromProject.idColor', foreignField: '_id', as: 'colorOfProject' } }
            ])
            .then(data => {
                res.status(200).send({
                    success: true,
                    task: data
                });
            })
            .catch(err => {
                res.status(500).send({
                    success: false,
                    err: err
                });
            })

        }
    });

});

//GET all tasks from projectId of verified token user id
router.get('/fromproject/:id', utils.verifyToken, (req, res, next) => {

    var idProject = req.params.id;

    jwt.verify(req.token, keys.secretKey, (err, authData) => {
        if (err) {
            res.status(403).send({
                success: false,
                err: err
            });
        } else {

            //find task from
            Task.aggregate([
                { $match: { idProject: ObjectId(idProject) } },
                { $lookup: { from: 'project', localField: 'idProject', foreignField: '_id', as: 'taskFromProject' } },
                { $match: { "taskFromProject.idUsers": ObjectId(authData.user._id) } },
                { $lookup: { from: 'color', localField: 'taskFromProject.idColor', foreignField: '_id', as: 'colorOfProject' } }
            ])
            .then(data => {
                res.status(200).send({
                    success: true,
                    tasks: data
                });
            })
            .catch(err => {
                res.status(500).send({
                    success: false,
                    err: err
                });
            })

        }
    });

});

//POST create a new task to verified user id project
router.post('/', utils.verifyToken, (req, res, next) => {

    //check req body
    if (req.body.body && req.body.schedule && req.body.priority && req.body.idProject) {
        
        //verify user token
        jwt.verify(req.token, key.secretKey, (err, authData) => {
            if (err) {
                res.status(403).send({
                    success: false,
                    err: err
                });
            } else {

                //verify if idProject is from auth user
                Task.aggregate([
                    { $match: { idProject: ObjectId(req.body.idProject) } },
                    { $lookup: { from: 'project', localField: 'idProject', foreignField: '_id', as: 'taskFromProject' } },
                    { $match: { "taskFromProject.idUsers": ObjectId(authData.user._id) } }
                ]) 
                .then(data => {

                    if (data.length >= 1) {

                        //Add task to project
                        const task = new Task({
                            body: req.body.body,
                            priority: req.body.priority,
                            isCompleted: false,
                            schedule: req.body.schedule,
                            idProject: req.body.idProject
                        });
                        task.save()
                        .then(result => {
                            res.status(200).send({
                                success: true,
                                result: result
                            });
                        })
                        .catch(err => {
                            res.status(500).send({
                                success: false,
                                err: err
                            });
                        })

                    } else {
                        res.status(200).send({
                            success: false,
                            err: "This idProject isn't yours"
                        });
                    }

                })
                .catch(err => {
                    res.status(500).send({
                        success: false,
                        err: err
                    });
                })
            }
        });

    } else {
        res.status(200).send({
            success: false,
            err: "Body Props are empty",
            requires: ["body","schedule","priority","idProject"]
        });
    }

});

//PUT Update task by taskId of verified token user id
router.put('/:id', utils.verifyToken, (req, res, next) => {

    var idTask = req.params.id;

    //Check req.body
    if (req.body.body && req.body.schedule) {
        
        //verify user token
        jwt.verify(req.token, keys.secretKey, (err, authData) => {
            if (err) {
                res.status(403).send({
                    success: false,
                    err: err
                });
            } else {
                
                //verify if task is from auth user
                Task.aggregate([
                    { $match: { _id: ObjectId(idTask) } },
                    { $lookup: { from: 'project', localField: 'idProject', foreignField: '_id', as: 'taskFromProject' } },
                    { $match: { "taskFromProject.idUsers": ObjectId(authData.user._id) } }
                ])
                .then(data => {
                    if (data.length >= 1) {
                        
                        //update task
                        Task.updateOne({ _id: idTask }, { $set: {
                            body: req.body.body,
                            schedule: req.body.schedule
                        }})
                        .exec()
                        .then(result => {
                            res.status(200).send({
                                success: true,
                                result: result
                            });
                        })
                        .catch(err => {
                            res.status(500).send({
                                success: false,
                                err: err
                            });
                        });

                    } else {
                        res.status(200).send({
                            success: false,
                            err: "This idTask isn't yours"
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        success: false,
                        err: err
                    });
                })

            }
        });

    } else {
        res.status(200).send({
            success: false,
            err: "Body Props are empty",
            requires: ["body","schedule"]
        });
    }

});

//PATCH change state of idTask isCompleted
router.patch('/:id', utils.verifyToken, (req, res, next) => {

    var idTask = req.params.id;

    //Check req.body
    if (req.body.isCompleted) {
        
        //verify user token
        jwt.verify(req.token, keys.secretKey, (err, authData) => {
            if (err) {
                res.status(403).send({
                    success: false,
                    err: err
                });
            } else {
                
                //verify if task is from auth user
                Task.aggregate([
                    { $match: { _id: ObjectId(idTask) } },
                    { $lookup: { from: 'project', localField: 'idProject', foreignField: '_id', as: 'taskFromProject' } },
                    { $match: { "taskFromProject.idUsers": ObjectId(authData.user._id) } }
                ])
                .then(data => {
                    if (data.length >= 1) {
                        
                        //change state isCompleted
                        Task.updateOne({ _id: idTask }, { $set: {
                            isCompleted: req.body.isCompleted
                        }})
                        .exec()
                        .then(result => {
                            res.status(200).send({
                                success: true,
                                result: result
                            });
                        })
                        .catch(err => {
                            res.status(500).send({
                                success: false,
                                err: err
                            });
                        });

                    } else {
                        res.status(200).send({
                            success: false,
                            err: "This idTask isn't yours"
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        success: false,
                        err: err
                    });
                })

            }
        });

    } else {
        res.status(200).send({
            success: false,
            err: "Body Props are empty",
            requires: ["isCompleted"]
        });
    }

});

//PATCH change state of idTask priority
router.patch('/:id', utils.verifyToken, (req, res, next) => {

    var idTask = req.params.id;

    //Check req.body
    if (req.body.priority) {
        
        //verify user token
        jwt.verify(req.token, keys.secretKey, (err, authData) => {
            if (err) {
                res.status(403).send({
                    success: false,
                    err: err
                });
            } else {
                
                //verify if task is from auth user
                Task.aggregate([
                    { $match: { _id: ObjectId(idTask) } },
                    { $lookup: { from: 'project', localField: 'idProject', foreignField: '_id', as: 'taskFromProject' } },
                    { $match: { "taskFromProject.idUsers": ObjectId(authData.user._id) } }
                ])
                .then(data => {
                    if (data.length >= 1) {
                        
                        //change state priority
                        Task.updateOne({ _id: idTask }, { $set: {
                            priority: req.body.priority
                        }})
                        .exec()
                        .then(result => {
                            res.status(200).send({
                                success: true,
                                result: result
                            });
                        })
                        .catch(err => {
                            res.status(500).send({
                                success: false,
                                err: err
                            });
                        });

                    } else {
                        res.status(200).send({
                            success: false,
                            err: "This idTask isn't yours"
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        success: false,
                        err: err
                    });
                })

            }
        });

    } else {
        res.status(200).send({
            success: false,
            err: "Body Props are empty",
            requires: ["priority"]
        });
    }

});

//DELETE task by taskId of verified token user id
router.delete('/:id', utils.verifyToken, (req, res, next) => {

    var idTask = req.params.id;

    //verify user token
    jwt.verify(req.token, keys.secretKey, (err, authData) => {
        if (err) {
            res.status(403).send({
                success: false,
                err: err
            });
        } else {
            
            //verify if idTask is from auth user
            Task.aggregate([
                { $match: { _id: ObjectId(idTask) } },
                { $lookup: { from: 'project', localField: 'idProject', foreignField: '_id', as: 'taskFromProject' } },
                { $match: { "taskFromProject.idUsers": ObjectId(authData.user._id) } }
            ])
            .then(data => {
                if (data.length >= 1) {
                    
                    //Delete task
                    Task.deleteOne({ _id: idTask })
                    .exec()
                    .then(result => {
                        res.status(200).send({
                            success: true,
                            result: result
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            success: false,
                            err: err
                        });
                    })

                } else {
                    res.status(200).send({
                        success: false,
                        err: "This idTask isn't yours"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    success: false,
                    err: err
                });
            })

        }
    });

});

module.exports = router;