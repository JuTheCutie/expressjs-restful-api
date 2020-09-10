var express = require('express');
var router = express.Router();
const keys = require('../key/key');
const utils = require('../bin/utils');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

//POST login
router.post('/login', (req, res ,next) => {

    //Check if not empty
    if ((req.body.password) && (req.body.nickname || req.body.email)) {
        var loginCred = {
            nickOrEmail: req.body.nickname.toLowerCase() || req.body.email.toLowerCase(),
            password: req.body.password
        };
    
        //Find user with user credentials
        User.aggregate([
            { 
                $match: {
                    $and: [{
                        $or: [
                            { "nickname": loginCred.nickOrEmail },
                            { "email": loginCred.nickOrEmail  }
                        ]},
                        { "password": loginCred.password }
                    ]
                }
            }
        ]).then(data => {
            //User Exists
            if (data[0]) {
                jwt.sign({user: data[0]}, keys.secretKey, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        res.status(500).send({ 
                            success: false,
                            err: err
                        });
                    } else {
                        res.status(200).send({
                            success: true,
                            user: data[0],
                            token: token
                        });
                    }
                });
            } else { // Doesn't Exists
                res.status(403).send({
                    success: false,
                    err: "Wrong Credentials"
                })
            }
        }).catch(err => {
            res.status(500).send({
                success: false,
                err: err
            });
        })   
    } else {//body props are empty
        res.status(200).send({
            success: false,
            err: "Body Props are empty"
        });
    }

});

//POST register
router.post('/register', (req, res ,next) => {

    if (req.body.nickname && req.body.name && req.body.email && req.body.password) {
        
        if (req.body.nickname.length >= 4 && req.body.password.length >= 8) {
            
            var newUser = {
                nickname: req.body.nickname.toLowerCase(),
                name: req.body.name,
                email: req.body.email.toLowerCase(),
                password: req.body.password
            }
        
            //Check if user exists
            User.aggregate([
                { 
                    $match: {
                        $or: [
                            { "nickname": newUser.nickname },
                            { "email": newUser.email }
                        ]
                    }
                }
            ]).then(data => {
                //if doesn't exists
                if (!data[0]) {
                    //Insert newUser
                    const user = new User(newUser);
                    user.save()
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
                } else { // exists
                    res.status(200).send({
                        success: false,
                        err: "User Already Exists"
                    })
                }
            }).catch(err => {
                res.status(500).send({
                    success: false,
                    err: err
                })
            });
        } else {
            res.status(200).send({
                success: false,
                err: [
                    "nickname needs to be >= 4",
                    "password needs to be >= 8"
                ]
            }); 
        }
            
        } else {
            res.status(200).send({
                success: false,
                err: "Body Props are empty",
                requires: ["nickname","name","email","password"]
            });
        }

});

//GET is logged in
router.get('/isloggedin', utils.verifyToken, (req, res, next) => {

    jwt.verify(req.token, keys.secretKey, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.status(200).send({
                success: true,
                message: "User is Logged In",
                authData: authData
            });
        }
    })

});

module.exports = router