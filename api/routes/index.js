var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {

  var date = new Date()

  res.status(200).send({
    project: "ProjectCheck API",
    ver: "1.0",
    machineDate: date
  });
});

module.exports = router;
