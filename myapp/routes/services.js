var express = require('express');
var router = express.Router();

/* GET home page. */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('services', { title: 'Music-Website', msg: '' });
});

module.exports = router;


/* uncomment it later
router.get('/',  function(req, res, next) {
  var loginUserCustomer = req.session.customerLoginUserName;//localStorage.getItem('customerLoginUserName');
  var loginUserEmployee = req.session.employeeLoginUserName;//localStorage.getItem('employeeLoginUserName');
  var loginUserAdmin = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName');

  if(loginUserCustomer){
    res.redirect('/dashboardcustomer');
  } else if(loginUserEmployee) {
    res.redirect('/dashboardemployees');
  } else if(loginUserAdmin) {
    res.redirect('/dashboardadmin');
  } else {
    res.render('services', { title: 'Front End Web Developer', msg:''});
  }  
});

*/



module.exports = router;
