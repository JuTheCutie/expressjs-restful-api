var express = require('express');
var router = express.Router();
const keys = require('../keys/key');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

//POST login
router.post('/login', (req, res ,next) => {

    var loginCred = {
        nickOrEmail: req.body.nickOrEmail,
        password: req.body.password
    };

    User.aggregate([
        {
            $and: [{
                $or: [
                    { "nickname": loginCred.nickOrEmail },
                    { "email": loginCred.nickOrEmail  }
                ]},
                { "password": loginCred.password }
            ]
        }
    ]).then(data => {
        if (data.length !== 0) {
            jwt.sign({user: user}, keys.secretKey, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    res.status(500).send({ 
                        success: false,
                        err: err
                    });
                } else {
                    res.status(200).send({
                        success: true,
                        token: token
                    });
                }
            });
        } else {
            res.status(403).send({
                success: false
            })
        }
    }).catch(err => {
        res.status(500).send({
            success: false,
            err: err
        });
    })

});

//POST register
router.post('/register', (req, res ,next) => {

});

//GET is logged in
router.get('/isloggedin', verifyToken, (req, res ,next) => {

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

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (typeof token !== 'undefined') {
        req.token = token;
        next();
    } else {
        res.sendStatus(403)
    }
}

module.exports = router