var express = require('express');
var cors = require('cors');
var logger = require('morgan');
var db = require('./bin/dbConn');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var authUserRouter = require('./routes/authUser');
var authProjectRouter = require('./routes/authProject');
var authTaskRouter = require('./routes/authTask');
var colorRouter = require('./routes/color');
var userRouter = require('./routes/user');

db.connect();
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api/', indexRouter);
app.use('/api/auth/', authRouter);
app.use('/api/auth/user', authUserRouter);
app.use('/api/auth/project', authProjectRouter);
app.use('/api/auth/task', authTaskRouter);
app.use('/api/color', colorRouter);
app.use('/api/user/', userRouter);

module.exports = app;
