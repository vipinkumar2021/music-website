var express = require('express');
var router = express.Router();

var uploadFileModel = require('../modules/uploadschema');

/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  if(loginUser.loginUserCustomer) {
    res.render('dashboardgallery', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserCustomer, imageGalleryData: imageGalleryData });
  } else if(loginUser.loginUserEmployee){
    res.render('dashboardgallery', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserEmployee, imageGalleryData: imageGalleryData });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardgalleryadmin', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserAdmin, imageGalleryData: imageGalleryData });
  } else {
    //res.redirect('gallery');
    uploadFileModel.find({}, {Filename: 1, _id: 0}).exec((err, imageGalleryData) => {
      if(err) {
        res.render('gallery', { title: 'Music-Website', msg: 'No Image Found', imageGalleryData: '' });
  
      } else {
        res.render('gallery', { title: 'Music-Website', msg: '', imageGalleryData: imageGalleryData });
  
      }
    });
  
  }   

    });

module.exports = router;
