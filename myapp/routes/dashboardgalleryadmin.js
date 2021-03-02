var express = require('express');
var router = express.Router();

var uploadFileModel = require('../modules/uploadschema');

/* GET home page. */
router.get('/',  function(req, res, next) {
    var loginUser = {
        loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
        loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
        loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
    
      };
  uploadFileModel.find({}, {Filename: 1, _id: 0}).exec((err, imageGalleryData) => {
    if(err) throw err;
    if(imageGalleryData != null) {
      
     // var imageName = imageGalleryData.Filename;
      if(loginUser.loginUserCustomer) {
        res.render('dashboardgalleryadmin', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserCustomer, imageGalleryData: imageGalleryData });
      } else if(loginUser.loginUserEmployee){
        res.render('dashboardgalleryadmin', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserEmployee, imageGalleryData: imageGalleryData });
      } else if(loginUser.loginUserAdmin) {
        res.render('dashboardgalleryadmin', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserAdmin, imageGalleryData: imageGalleryData });
      } else {
        res.redirect('gallery');
      }   

    } else {

      if(loginUser.loginUserCustomer) {
        res.render('dashboardgallery', { title: 'Front End Web Developer', msg:'No Image Available', loginUser: loginUser.loginUserCustomer, imageGalleryData: '' });
      } else if(loginUser.loginUserEmployee){
        res.render('dashboardgallery', { title: 'Front End Web Developer', msg:'No Image Available', loginUser: loginUser.loginUserEmployee, imageGalleryData: '' });
      } else if(loginUser.loginUserAdmin) {
        res.render('dashboardgallery', { title: 'Front End Web Developer', msg:'No Image Available', loginUser: loginUser.loginUserAdmin, imageGalleryData: ''});
      } else {
        res.redirect('gallery');
      }   

    }
  });

  
});





module.exports = router;
