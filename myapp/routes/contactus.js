var express = require('express');
var router = express.Router();
var contactusModel = require("../modules/contactusschema");

router.post('/', (req, res, next) => {
  var contactUsMessageDetails = new contactusModel({
    Firstname: req.body.firstname,
    Lastname: req.body.lastname,
    Mobilenumber: req.body.mobilenumber,
    Email: req.body.email,
    WriteMessage: req.body.writeusmessage
  });
  contactUsMessageDetails.save((err) => {
    if(err) throw err;

    res.render('index', {title: 'SaReGaMa Music Academy & GMP Studio', msg: 'Message Submitted Successfully, You will be contacted soon. Thanks!' });

  });
});
/*
router.post('/', function(req, res, next) {
    var contactUsMessageDetails = new contactusModel({
      Firstname: req.body.firstname,
      Lastname: req.body.lastname,
      Mobilenumber: req.body.mobilenumber,
      Email: req.body.email,
      WriteMessage: req.body.writeusmessage
    });
    contactUsMessageDetails.save((err) => {
      if(err) throw err;

           
      var loginUser = {
        loginUserCustomer: localStorage.getItem('customerLoginUserName'),
        loginUserEmployee: localStorage.getItem('employeeLoginUserName'),
        loginUserAdmin: localStorage.getItem('adminLoginUserName')
    
      };
      
      if(loginUser.loginUserCustomer) {
        res.render('dashboardcustomer', { title: 'SaReGaMa Music Academy & GMP Studio', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserCustomer });
      } else if(loginUser.loginUserEmployee){
        res.render('dashboardemployees', { title: 'SaReGaMa Music Academy & GMP Studio', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserEmployee, savedData:'', staffdata: '', staffid: '' });
      } else if(loginUser.loginUserAdmin) {
        res.render('dashboardadmin', { title: 'SaReGaMa Music Academy & GMP Studio', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserAdmin, savedData: '', staffdata: '', staffid: '' });
      } else {
        res.render('index', {title: 'SaReGaMa Music Academy & GMP Studio', msg: 'Message Submitted Successfully, You will be contacted soon. Thanks!' });

      } 
       
          });
  });
  */

  module.exports = router;