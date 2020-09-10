var express = require('express');
var router = express.Router();
const keys = require('../key/key');
const utils = require('../bin/utils');
const jwt = require('jsonwebtoken');

const Project = require('../model/project');

//GET Read all projects from userId:
router.get('/', utils.verifyToken, (req, res, next) => {

    //Check req body
    if (req.body.idUser) {
        
        //verify user token
        jwt.verify(req.token, keys.secretKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                //verify if idUser is auth user id
                if (req.body.idUser === authData.user._id) {

                    //Find all projects from idUser
                    Project.aggregate([
                        { $match: { idUsers: req.body.idUser } }
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

                } else {
                    res.status(403).send({
                        success: false,
                        err: ":id doesn't match token data id"
                    });
                }
            }
        });

    } else {
        res.status(200).send({
            success: false,
            err: "Body Props are empty",
            requires: ["idUser"]
        });
    }

});

//POST Create project to user idUser
router.post('/new', utils.verifyToken, (req, res, next) => {
    
    //Check req body
    if (req.body.name && req.body.idColor && req.body.idUser) {
        
        //verify user token
        jwt.verify(req.token, keys.secretKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                //verify if idUser is auth user id
                if (req.body.idUser === authData.user._id) {

                    //Create project
                    const project = new Project({
                        name: req.body.name,
                        idColor: req.body.idColor,
                        idUsers: [req.body.idUser]
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

                } else {
                    res.status(403).send({
                        success: false,
                        err: ":id doesn't match token data id"
                    });
                }
            }
        });

    } else {
        res.status(200).send({
            success: false,
            err: "Body Props are empty",
            requires: ["name","idColor","idUser"]
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

            Project.findById({ _id: idProject })
            .exec()
            .then(data => {

                //verify if idUser of the project is auth user id
                for (let i=0; i<data.idUsers.length; i++) {
                    if (data.idUsers[i] === authData.user._id) {
                        res.status(200).send({
                            success: true,
                            project: data
                        });
                    }
                }
                res.status(403).send({
                    success: false,
                    err: ":id doesn't match token data id"
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

});

//PUT Update project by :id
router.put('/:id', utils.verifyToken, (req, res, next) => {

    var idProject = req.params.id;

    //Check req body
    if (req.body.name && req.body.idColor && req.body.idUser) {
        
        //verify user token
        jwt.verify(req.token, keys.secretKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                //verify if idUser is auth user id
                if (req.body.idUser === authData.user._id) {

                    //Update project
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
                        err: ":id doesn't match token data id"
                    });
                }
            }
        });

    } else {
        res.status(200).send({
            success: false,
            err: "Body Props are empty",
            requires: ["name","idColor","idUser"]
        });
    }

});

//PATCH add collaborator to project
router.patch('/add/collaborator', utils.verifyToken, (req, res, next) => {

    //Check req body
    if (req.body.idUser && req.body.idProject && Array.isArray(req.body.idCollabs)) {

        if (req.body.idCollabs.length !== 0) {

            //verify user token
            jwt.verify(req.token, keys.secretKey, (err, authData) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    //verify if idUser is auth user id
                    if (req.body.idUser === authData.user._id) {

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
                            err: ":id doesn't match token data id"
                        });
                    }
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
            requires: ["idUser","idProject","idCollabs"]
        });
    }

});

//PATCH remove collaborator
router.patch('/remove/collaborator', utils.verifyToken, (req, res, next) => {

    //Check req body
    if (req.body.idUser && req.body.idProject && req.body.idCollab) {
        
        //verify user token
        jwt.verify(req.token, keys.secretKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                //verify if idUser is auth user id
                if (req.body.idUser === authData.user._id) {

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
                        err: ":id doesn't match token data id"
                    });
                }
            }
        });

    } else {
        res.status(200).send({
            success: false,
            err: "Body Props are empty",
            requires: ["idUser","idProject","idCollab"]
        });
    }

});

//DELETE project by :id
router.delete('/:id', utils.verifyToken, (req, res, next) => {

    var idProject = req.params.id;

    //Check req body
    if (req.body.idUser) {
        
        //verify user token
        jwt.verify(req.token, keys.secretKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                //verify if idUser is auth user id
                if (req.body.idUser === authData.user._id) {

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
                        err: ":id doesn't match token data id"
                    });
                }
            }
        });

    } else {
        res.status(200).send({
            success: false,
            err: "Body Props are empty",
            requires: ["idUser"]
        });
    }

});

module.exports = router;