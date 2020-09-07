var express = require('express');
var logger = require('morgan');
var db = require('./bin/dbConn');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

db.connect();
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api/', indexRouter);
app.use('/api/auth/', authRouter);

module.exports = app;
