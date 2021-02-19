var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//import session Vipin...
var session = require('express-session')
//Requiring bodyparser Vipin
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var galleryRouter = require('./routes/gallery');
var servicesRouter = require('./routes/services');
var contactusRouter = require('./routes/contactus');
var adminRouter = require('./routes/admin');
var musicclassesRouter = require('./routes/musicclasses');
var audiorecordyoursongRouter = require('./routes/audiorecordyoursong');
var videoshootyoursongRouter = require('./routes/videoshootyoursong');
var bookliveconcertRouter = require('./routes/bookliveconcert');
var vocalclassesRouter = require('./routes/vocalclasses');
var guitarclassesRouter = require('./routes/guitarclasses');
var tablaclassesRouter = require('./routes/tablaclasses');
var pianoclassesRouter = require('./routes/pianoclasses');
var harmoniumclassesRouter = require('./routes/harmoniumclasses');
var musicproductionRouter = require('./routes/musicproduction');
var dashboardcustomerRouter = require('./routes/dashboardcustomer');
var dashboardadminRouter = require('./routes/dashboardadmin');
var signoutRouter = require('./routes/signout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Vipin
// require dot env
require('dotenv').config();
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gallery', galleryRouter);
app.use('/services', servicesRouter);
app.use('/contactus', contactusRouter);
app.use('/admin', adminRouter);
app.use('/musicclasses', musicclassesRouter);
app.use('/audiorecordyoursong', audiorecordyoursongRouter);
app.use('/videoshootyoursong', videoshootyoursongRouter);
app.use('/bookliveconcert', bookliveconcertRouter);
app.use('/vocalclasses', vocalclassesRouter);
app.use('/guitarclasses', guitarclassesRouter);
app.use('/tablaclasses', tablaclassesRouter);
app.use('/pianoclasses', pianoclassesRouter);
app.use('/harmoniumclasses', harmoniumclassesRouter);
app.use('/musicproduction', musicproductionRouter);
app.use('/dashboardcustomer', dashboardcustomerRouter);
app.use('/dashboardadmin', dashboardadminRouter);
app.use('/signout', signoutRouter);

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
