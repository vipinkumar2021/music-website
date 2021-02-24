var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',  function(req, res, next) {
    var loginUserAdmin = req.session.adminLoginUserName;
    
    if(loginUserAdmin) {
        res.render('dashboardwebsiteadmin', { title: 'Front End Web Developer', msg:'', loginUser: loginUserAdmin});
  } else {
    res.redirect('/');
  }
});


module.exports = router;
