var express = require('express');
var router = express.Router();

var outboxModel = require('../modules/outboxschema');
//nodemailer for sending emails from website to clients
var nodemailer = require('nodemailer');
  /* GET home page. */
  router.get('/',  function(req, res, next) {
    var loginUser = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName');
  
    if(loginUser) {
        res.render('createprofile', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUser});
      } else {
        res.redirect('admin');
      }   
    });   
  
  
        
  
  

 
module.exports = router;
