var express = require('express');
var router = express.Router();

/* GET home page. */
/* uncomment it later
router.get('/',  function(req, res, next) {
  var loginUserCustomer = localStorage.getItem('customerLoginUserName');
  var loginUserEmployee = localStorage.getItem('employeeLoginUserName');
  var loginUserAdmin = localStorage.getItem('adminLoginUserName');
  
  if(loginUserCustomer){
    res.redirect('/dashboardcustomer');
  } else if(loginUserEmployee) {
    res.redirect('/dashboardemployees');
  } else if(loginUserAdmin) {
    res.redirect('/dashboardadmin');
  } else {
    res.render('pianoclasses', { title: 'Front End Web Developer', msg:''});
  }  
});

*/

router.get('/', function(req, res, next) {
    res.render('pianoclasses', { title: 'Music-Website', msg: '' });
  });



module.exports = router;
