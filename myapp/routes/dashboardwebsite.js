var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',  function(req, res, next) {
    var loginUserCustomer = req.session.customerLoginUserName;
      if(loginUserCustomer) {
      res.render('dashboardwebsite', { title: 'Front End Web Developer', msg:'', loginUser: loginUserCustomer });
       } else {
      res.redirect('/');
  }
});


module.exports = router;
