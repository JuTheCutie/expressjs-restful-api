var express = require('express');
var router = express.Router();

const User = require('../model/user');

//GET users :limit
router.get('/all/:limit', (req, res, next) => {

    var limit = req.params.limit;

    if (!isNaN(limit)) {

        User.aggregate([
            { $limit: Number(limit) }
        ]).then(data => {
            res.status(200).send({
                success: true,
                users: data
            });
        }).catch(err => {
            res.status(500).send({
                success: false,
                err: err
            });
        });

    } else {
        res.status(200).send({
            success: false,
            err: limit+" isNaN"
        });
    }

});

//GET user by :id
router.get('/:id', (req, res, next) => {

    var id = req.params.id;

    User.findById(id)
    .then(data => {
        res.status(200).send({
            success: true,
            user: data
        })
    })
    .catch(err => {
        res.status(500).send({
            success: false,
            err: err
        })
    });

});

module.exports = router;