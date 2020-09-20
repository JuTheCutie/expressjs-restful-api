var express = require('express');
var router = express.Router();

const Color = require('../model/color');

//GET All colors
router.get('/', (req, res, next) => {
    Color.find()
        .exec()
        .then(data => {
            res.status(200).send({
                success: true,
                colors: data
            });
        })
        .catch(err => {
            res.status(200).send({
                success: false,
                err: err
            });
        });
});

//GET Color by :id
router.get('/:id', (req, res, next) => {

    var id = req.params.id;

    Color.findById({ _id: id })
    .exec()
    .then(data => {
        res.status(200).send({
            success: true,
            color: data
        });
    })
    .catch(err => {
        res.status(200).send({
            success: false,
            err: err
        });
    })

});

module.exports = router;