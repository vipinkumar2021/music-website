var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/',  function(req, res, next) {
    var loginUser = {
        loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
        loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
        loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
    
      };
  if(loginUser.loginUserCustomer) {
    res.render('dashboardmusicclasses', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee){
    res.render('dashboardmusicclasses', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardmusicclasses', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserAdmin});
  } else {
    res.redirect('musicclasses');
  }   
});





module.exports = router;
