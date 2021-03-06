const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const client = require('./db.js').client;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// in case of swap to view model
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'temp secret',
  store: MongoStore.create({
    mongoUrl: client
  }),
  resave: 'false',
  saveUninitialized: 'false'
}));

app.use( express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'views', 'output')))

app.use('/', indexRouter);
app.use('/users', usersRouter); // TODO USER PROFILE ROUTES

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
