var express = require('express');
var logger = require('morgan');
var db = require('./bin/dbConn');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var authUserRouter = require('./routes/authUser');
var authProjectRouter = require('./routes/authProject');
var userRouter = require('./routes/user');
var colorRouter = require('./routes/color');

db.connect();
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api/', indexRouter);
app.use('/api/auth/', authRouter);
app.use('/api/auth/user', authUserRouter);
app.use('/api/auth/project', authProjectRouter);
app.use('/api/user/', userRouter);
app.use('/api/color', colorRouter);

module.exports = app;
