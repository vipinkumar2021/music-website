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
    res.render('dashboardpianoclasses', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee){
    res.render('dashboardpianoclasses', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardpianoclasses', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserAdmin});
  } else {
    res.redirect('pianoclasses');
  }   
});





module.exports = router;
