var express = require('express');
var router = express.Router();
const keys = require('../key/key');
const utils = require('../bin/utils');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

//PUT Update user by :id
router.put('/update/:id', utils.verifyToken, (req, res, next) => {

    var id = req.params.id;

    if (req.body.nickname && req.body.name && req.body.email && req.body.password) {

        //verify user token
        jwt.verify(req.token, keys.secretKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {

                //verify if :id is auth user id
                if (id === authData.user._id) {

                    //update user
                    User.updateOne({ _id: id }, { $set: {
                        nickname: req.body.nickname.toLowerCase(),
                        name: req.body.name,
                        email: req.body.email.toLowerCase(),
                        password: req.body.password
                    }}).exec()
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
            requires: ["nickname","name","email","password"]
        });
    }

});

//DELETE user by :id
router.delete('/delete/:id', utils.verifyToken, (req, res, next) => {

    var id = req.params.id;

    //verify user token
    jwt.verify(req.token, keys.secretKey, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            //verify if :id is auth user id
            if (id === authData.user._id) {

                //delete user
                User.deleteOne({ _id: id })
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

});

module.exports = router;