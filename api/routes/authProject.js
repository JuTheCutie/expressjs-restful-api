var express = require('express');
var router = express.Router();
const keys = require('../key/key');
const utils = require('../bin/utils');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Project = require('../model/project');

//GET Read all projects from userId:
router.get('/', utils.verifyToken, (req, res, next) => {
        
    //verify user token
    jwt.verify(req.token, keys.secretKey, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            //Find all projects from auth user
            Project.aggregate([
                { $match: { idUsers: ObjectId(authData.user._id) } },
                { $lookup: { from: 'user', localField: 'idUsers', foreignField: '_id', as: 'idUsers' } },
                { $lookup: { from: 'color', localField: 'idColor', foreignField: '_id', as: 'idColor' } }
            ]).then(data => {
                res.status(200).send({
                    success: true,
                    projects: data
                });
            }).catch(err => {
                res.status(500).send({
                    success: false,
                    err: err
                });
            });

        }
    });
});

//POST Create project to user idUser
router.post('/', utils.verifyToken, (req, res, next) => {
    
    //Check req body
    if (req.body.name && req.body.idColor) {
        
        //verify user token
        jwt.verify(req.token, keys.secretKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {

                //Create project
                const project = new Project({
                    name: req.body.name,
                    idColor: req.body.idColor,
                    idUsers: [authData.user._id]
                });
                project.save()
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
            }
        });

    } else {
        res.status(200).send({
            success: false,
            err: "Body Props are empty",
            requires: ["name","idColor"]
        });
    }

});

//GET Read project by :id
router.get('/:id', utils.verifyToken, (req, res, next) => {

    var idProject = req.params.id;

    //verify user token
    jwt.verify(req.token, keys.secretKey, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            console.log(idProject.toString())

            Project.aggregate([
                { $match: { _id: ObjectId(idProject) } },
                { $lookup: { from: 'user', localField: 'idUsers', foreignField: '_id', as: 'idUsers' } },
                { $lookup: { from: 'color', localField: 'idColor', foreignField: '_id', as: 'idColor' } }
            ])
            .then(data => {

                var verifiedUser = false;
                //verify if idUser of the project is auth user id
                for (let i=0; i<data[0].idUsers.length; i++) {
                    if (data[0].idUsers[i]._id == authData.user._id) {
                        verifiedUser = true;
                    }
                }

                if (verifiedUser) {
                    res.status(200).send({
                        success: true,
                        project: data
                    });
                } else {
                    res.status(403).send({
                        success: false,
                        err: ":id doesn't match token data id"
                    });
                }

            })
            .catch(err => {
                res.status(500).send({
                    success: false,
                    err: err
                });
            });

        }
    });

});

//PUT Update project by :id
router.put('/:id', utils.verifyToken, (req, res, next) => {

    var idProject = req.params.id;

    //Check req body
    if (req.body.name && req.body.idColor) {
        
        //verify user token
        jwt.verify(req.token, keys.secretKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {

                //verify if idProject is from authUser
                Project.findById({ _id: idProject })
                .exec()
                .then(data => {

                    var verifiedUser = false;
                    //verify if idUser of the project is auth user id
                    for (let i=0; i<data.idUsers.length; i++) {
                        if (data.idUsers[i] == authData.user._id) {
                            verifiedUser = true;
                        }
                    }

                    if (verifiedUser) {

                        //Update Project
                        Project.updateOne({ _id: idProject }, { $set: {
                            name: req.body.name,
                            idColor: req.body.idColor
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
                        res.status(403).send({
                            success: false,
                            err: "You're not in this project"
                        });
                    }
                    
                })
                .catch(err => {
                    res.status(500).send({
                        success: false,
                        err: err
                    })
                });
            }
        });

    } else {
        res.status(200).send({
            success: false,
            err: "Body Props are empty",
            requires: ["name","idColor"]
        });
    }

});

//PATCH add collaborator to project
router.patch('/add/collaborator', utils.verifyToken, (req, res, next) => {

    //Check req body
    if (req.body.idProject && Array.isArray(req.body.idCollabs)) {

        if (req.body.idCollabs.length !== 0) {

            //verify user token
            jwt.verify(req.token, keys.secretKey, (err, authData) => {
                if (err) {
                    res.sendStatus(403);
                } else {

                    //verify if idProject if from auth user
                    Project.findById({ _id: req.body.idProject })
                    .exec()
                    .then(data => {

                        var verifiedUser = false;
                        var collabAlredyExists = false;
                        //verify if idUser of the project is auth user id
                        for (let i=0; i<data.idUsers.length; i++) {
                            if (data.idUsers[i] == authData.user._id) {
                                verifiedUser = true;
                                break;
                            }
                        }

                        //verify if collab already exists
                        for (let i=0; i<data.idUsers.length; i++) {
                            for (let j=0; j<req.body.idCollabs.length; j++) {
                                if (req.body.idCollabs[j] == data.idUsers[i]) {
                                    collabAlredyExists = true;
                                    break;
                                }
                            }
                        }

                        if (verifiedUser && !collabAlredyExists) {

                            //Add collaborator to project
                            Project.updateOne(
                                { _id: req.body.idProject },
                                { $push: { idUsers: { $each: req.body.idCollabs } } }
                            ).exec()
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
                            res.status(403).send({
                                success: false,
                                err: "You're not in this project or collaborator is already on project"
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
                err: "idCollabs needs to be an array with objectId items"
            });
        }

    } else {
        res.status(200).send({
            success: false,
            err: "Body Props are empty",
            requires: ["idProject","idCollabs"]
        });
    }

});

//PATCH remove collaborator
router.patch('/remove/collaborator', utils.verifyToken, (req, res, next) => {

    //Check req body
    if (req.body.idProject && req.body.idCollab) {
        
        //verify user token
        jwt.verify(req.token, keys.secretKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {


                //verify if idProject is from auth user
                Project.findById({ _id: req.body.idProject })
                .exec()
                .then(data => {

                    var verifiedUser = false;
                    //verify if idUser of the project is auth user id
                    for (let i=0; i<data.idUsers.length; i++) {
                        if (data.idUsers[i] == authData.user._id) {
                            verifiedUser = true;
                        }
                    }

                    if (verifiedUser) {

                        //Remove collaborator from the project
                        Project.updateOne(
                            { _id: req.body.idProject },
                            { $pull: { idUsers: req.body.idCollab }}
                        ).exec()
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
                            })
                        });

                    } else {
                        res.status(403).send({
                            success: false,
                            err: "You're not in this project"
                        });
                    }

                })
                .catch(err => {
                    res.status(500).send({
                        success: false,
                        err: err
                    })
                });
            }
        });

    } else {
        res.status(200).send({
            success: false,
            err: "Body Props are empty",
            requires: ["idProject","idCollab"]
        });
    }

});

//DELETE project by :id
router.delete('/:id', utils.verifyToken, (req, res, next) => {

    var idProject = req.params.id;
        
    //verify user token
    jwt.verify(req.token, keys.secretKey, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            //Verify if idProject is from the authUser
            Project.findById({ _id: idProject })
            .exec()
            .then(data => {

                var verifiedUser = false;
                //verify if idUser of the project is auth user id
                for (let i=0; i<data.idUsers.length; i++) {
                    if (data.idUsers[i] == authData.user._id) {
                        verifiedUser = true;
                    }
                }

                if (verifiedUser) {

                    //Delete project
                    Project.deleteOne({ _id: idProject })
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
                    res.status(403).send({
                        success: false,
                        err: "You're not in this project"
                    });
                }

            })
            .catch(err => {
                res.status(500).send({
                    success: false,
                    err: err
                });
            });
        }
    });

});

module.exports = router;