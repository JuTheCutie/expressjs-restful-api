var express = require('express');
var logger = require('morgan');
var db = require('./bin/dbConn');

var indexRouter = require('./routes/index');

db.connect();
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api/', indexRouter);

module.exports = app;
