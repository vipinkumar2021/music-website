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
var dashboardgalleryRouter = require('./routes/dashboardgallery');

var servicesRouter = require('./routes/services');
var dashboardservicesRouter = require('./routes/dashboardservices');

var contactusRouter = require('./routes/contactus');

var adminRouter = require('./routes/admin');
var dashboardadminRouter = require('./routes/dashboardadmin');
var inboxRouter = require('./routes/inbox');
var outboxRouter = require('./routes/outbox');
var adminstafflistRouter = require('./routes/adminstafflist');
var clientslistRouter = require('./routes/clientslist');
var recyclebinRouter = require('./routes/recyclebin');
var createprofileRouter = require('./routes/createprofile');
var editprofileRouter = require('./routes/editprofile');
var uploadfileRouter = require('./routes/uploadfile');
var giveaccessRouter = require('./routes/giveaccess');
var dashboardwebsiteadminRouter = require('./routes/dashboardwebsiteadmin');
var dashboardgalleryadminRouter = require('./routes/dashboardgalleryadmin');

var musicclassesRouter = require('./routes/musicclasses');
var dashboardmusicclassesRouter = require('./routes/dashboardmusicclasses');

var audiorecordyoursongRouter = require('./routes/audiorecordyoursong');
var dashboardaudiorecordyoursongRouter = require('./routes/dashboardaudiorecordyoursong');

var videoshootyoursongRouter = require('./routes/videoshootyoursong');
var dashboardvideoshootyoursongRouter = require('./routes/dashboardvideoshootyoursong');

var bookliveconcertRouter = require('./routes/bookliveconcert');
var dashboardbookliveconcertRouter = require('./routes/dashboardbookliveconcert');

var vocalclassesRouter = require('./routes/vocalclasses');
var dashboardvocalclassesRouter = require('./routes/dashboardvocalclasses');

var guitarclassesRouter = require('./routes/guitarclasses');
var dashboardguitarclassesRouter = require('./routes/dashboardguitarclasses');

var tablaclassesRouter = require('./routes/tablaclasses');
var dashboardtablaclassesRouter = require('./routes/dashboardtablaclasses');

var pianoclassesRouter = require('./routes/pianoclasses');
var dashboardpianoclassesRouter = require('./routes/dashboardpianoclasses');

var harmoniumclassesRouter = require('./routes/harmoniumclasses');
var dashboardharmoniumclassesRouter = require('./routes/dashboardharmoniumclasses');

var musicproductionRouter = require('./routes/musicproduction');
var dashboardmusicproductionRouter = require('./routes/dashboardmusicproduction');

var dashboardcustomerRouter = require('./routes/dashboardcustomer');
var dashboardwebsiteRouter = require('./routes/dashboardwebsite');

var dashboardcartRouter = require('./routes/dashboardcart');

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
app.use('/dashboardgallery', dashboardgalleryRouter);

app.use('/services', servicesRouter);
app.use('/dashboardservices', dashboardservicesRouter);

app.use('/contactus', contactusRouter);

app.use('/admin', adminRouter);
app.use('/dashboardadmin', dashboardadminRouter);
app.use('/inbox', inboxRouter);
app.use('/outbox', outboxRouter);
app.use('/adminstafflist', adminstafflistRouter);
app.use('/clientslist', clientslistRouter);
app.use('/recyclebin', recyclebinRouter);
app.use('/createprofile', createprofileRouter);
app.use('/editprofile', editprofileRouter);
app.use('/uploadfile', uploadfileRouter);
app.use('/giveaccess', giveaccessRouter);
app.use('/dashboardwebsiteadmin', dashboardwebsiteadminRouter);
app.use('/dashboardgalleryadmin', dashboardgalleryadminRouter);

app.use('/musicclasses', musicclassesRouter);
app.use('/dashboardmusicclasses', dashboardmusicclassesRouter);

app.use('/audiorecordyoursong', audiorecordyoursongRouter);
app.use('/dashboardaudiorecordyoursong', dashboardaudiorecordyoursongRouter);

app.use('/videoshootyoursong', videoshootyoursongRouter);
app.use('/dashboardvideoshootyoursong', dashboardvideoshootyoursongRouter);

app.use('/bookliveconcert', bookliveconcertRouter);
app.use('/dashboardbookliveconcert', dashboardbookliveconcertRouter);

app.use('/vocalclasses', vocalclassesRouter);
app.use('/dashboardvocalclasses', dashboardvocalclassesRouter);

app.use('/guitarclasses', guitarclassesRouter);
app.use('/dashboardguitarclasses', dashboardguitarclassesRouter);

app.use('/tablaclasses', tablaclassesRouter);
app.use('/dashboardtablaclasses', dashboardtablaclassesRouter);

app.use('/pianoclasses', pianoclassesRouter);
app.use('/dashboardpianoclasses', dashboardpianoclassesRouter);

app.use('/harmoniumclasses', harmoniumclassesRouter);
app.use('/dashboardharmoniumclasses', dashboardharmoniumclassesRouter);

app.use('/musicproduction', musicproductionRouter);
app.use('/dashboardmusicproduction', dashboardmusicproductionRouter);

app.use('/dashboardcustomer', dashboardcustomerRouter);
app.use('/dashboardwebsite', dashboardwebsiteRouter);

app.use('/dashboardcart', dashboardcartRouter);

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
