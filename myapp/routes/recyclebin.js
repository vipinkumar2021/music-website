var express = require('express');
var router = express.Router();

var recycleBinModel = require('../modules/recyclebinschema');
//nodemailer for sending emails from website to clients
var nodemailer = require('nodemailer');
  /* GET home page. */
  router.get('/',  function(req, res, next) {
    var loginUser = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName')  
    var DeletedCustomerAccountDetails = 'DeletedCustomerAccountDetails';
    if(loginUser) {
      recycleBinModel.find({}).exec((err, deletedData) => {
        if(err) throw err;
        if(deletedData != null) {
          //var getId = deletedData._id;
          //var deletedCustomerAccountDetails = deletedData.DeletedCustomerAccountDetails
          res.render('recyclebin', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUser, deletedData: deletedData});

        } else {
          res.render('recyclebin', { title: 'SareGaMa Music Academy & GMP Studio', msg:'No Data Available', loginUser: loginUser, deletedData: ''});

        }          
      
      });
    
      
      } else {
        res.redirect('/');
      }   
        
  });
  

 
module.exports = router;
