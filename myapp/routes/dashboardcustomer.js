var express = require('express');
var router = express.Router();


//jwt for creating a token
var jwt = require('jsonwebtoken');
// require local storage 
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

//middleware
//Check LoginUser
/*
function checkLoginUser(req, res, next) {
  var getLoginToken = localStorage.getItem('customerLoginTokenName');
  try{
    var decoded = jwt.verify(getLoginToken, process.env.CUSTOMER_LOGIN_TOKEN_ACCESS_KEY);
  }catch(err) {
    res.redirect('/');
  }
  next();
}
*/

/* GET home page. */ //Exactally Correct One
/* uncomment it later
router.get('/',  function(req, res, next) {
  var loginUser = {
    loginUserCustomer: localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: localStorage.getItem('adminLoginUserName')

  };
  if(loginUser.loginUserCustomer) {
    res.render('dashboardcustomer', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee){
    res.redirect('dashboardemployees');
    //res.render('dashboardemployees', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserEmployee, savedData:'', staffdata: '', staffid: '' });
  } else if(loginUser.loginUserAdmin) {
    /*var getSavedData = adminModule.findOne({Ussername: loginUser.loginUserAdmin});
      getSavedData.exec((err, savedData)=> { 

        if(err) throw err;
        
      res.render('dashboardadmin', { title: 'Frontend Webdeveloper', loginUser: loginUser.loginUserAdmin, staffdata: '', staffid: '', msg: '', file: '', uploadedImage: '', savedData: savedData });
     });
      */
   /* uncomment it later
      res.redirect('dashboardadmin');
   // res.render('dashboardtadmin', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserAdmin});
  } else {
    res.redirect('/');
  }   
});

 uncomment it later */

 

 router.get('/',  function(req, res, next) {

    var loginUser = localStorage.getItem('customerLoginUsername');
    if(loginUser) {
        res.render('dashboardcustomer', { title: 'Front End Web Developer', msg:'', loginUser: loginUser/*.loginUserCustomer */});
    } else {
        res.redirect('/');
      }   
 });
    
module.exports = router;
