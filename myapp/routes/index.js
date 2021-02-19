var express = require('express');
var router = express.Router();

var adminModule = require('../modules/adminschema');
var customerModel = require('../modules/customersignupschema');
var employeesModel = require('../modules/employeessignupschema');

// require dot env
require('dotenv').config();
//Crypto for creating randombytes key
var crypto = require('crypto');
//nodemailer for sending emails from website to clients
var nodemailer = require('nodemailer');

//encrypt passwords using bcrypt
var bcrypt = require('bcryptjs');





/*
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Music-Website', msg: '' });
});
*/
// uncomment it later

router.get('/',  function(req, res, next) {
  /*
  var loginUserCustomer = req.session.customerLoginUserName;//localStorage.getItem('customerLoginUserName');
  var loginUserEmployee = req.session.employeeLoginUserName;//localStorage.getItem('employeeLoginUserName');
  var loginUserAdmin = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName');
*/

  if(req.session.customerLoginUserName){
    res.redirect('/dashboardcustomer');
  } else if(req.session.employeeLoginUserName) {
    res.redirect('/dashboardemployees');
  } else if(req.session.adminLoginUserName) {
    res.redirect('/dashboardadmin');
  } else {
    res.render('index', { title: 'SaReGaMa Music Academy & GMP Studio', msg:''});
  }  
});


//Middleware Check username Exactly Correct One
function checkUsername(req, res, next) {
  var username = req.body.usrname;
  var getCustomerData = customerModel.findOne({Username: username});
  getCustomerData.exec((err, customerData) => {
    if(err) throw err;
    if(customerData) {

      return res.render('index', {title: 'Front End Web Developer', msg: 'Username Already Exists'});
    
    }     
    if(!customerData) {

      var getEmployeeData = employeesModel.findOne({Username: username});
      getEmployeeData.exec((err, employeeData) => {
        if(err) throw err;
        if(employeeData) {

        return res.render('index', {title: 'Front End Web Developer', msg: 'Username Already Exists'});
 
      }
      if(!employeeData) {

        var getAdminData = adminModule.findOne({Username: username});
        getAdminData.exec((err, adminData) => {
          if(err) throw err;
          if(adminData) {

            return res.render('index', {title: 'Front End Web Developer', msg: 'Username Already Exists'});
 
          }
          next();
        });
      }
      });

    }
    //
  });
 }
//Middleware Check Mobile Number Exactally Correct One
function checkMobileNumber(req, res, next) {
  var mobilenumber = req.body.mobilenumber;
  var getCustomerData = customerModel.findOne({Mobilenumber: mobilenumber});
  getCustomerData.exec((err, customerData) => {
    if(err) throw err;
    if(customerData) {

      return res.render('index', {title: 'Front End Web Developer', msg: 'This Mobile Number is Already Registered with us'});
    
    }     
    if(!customerData) {

      var getEmployeeData = employeesModel.findOne({Mobilenumber: mobilenumber});
      getEmployeeData.exec((err, employeeData) => {
        if(err) throw err;
        if(employeeData) {

        return res.render('index', {title: 'Front End Web Developer', msg: 'This Mobile Number is Already Registered with us'});
 
      }
      if(!employeeData) {

        var getAdminData = adminModule.findOne({Mobilenumber: mobilenumber});
        getAdminData.exec((err, adminData) => {
          if(err) throw err;
          if(adminData) {

            return res.render('index', {title: 'Front End Web Developer', msg: 'This Mobile Number is Already Registered with us'});
 
          }
          next();
        });
      }
      });

    }
    
  });
 }

 //Middleware Check Email Exactally Correct One
 function checkEmail(req, res, next) {
  var email = req.body.email;
  var getCustomerData = customerModel.findOne({Email: email});
  getCustomerData.exec((err, customerData) => {
    if(err) throw err;
    if(customerData) {

      return res.render('index', {title: 'Front End Web Developer', msg: 'This Email is Already Registered with us'});
    
    }     
    if(!customerData) {

      var getEmployeeData = employeesModel.findOne({Email: email});
      getEmployeeData.exec((err, employeeData) => {
        if(err) throw err;
        if(employeeData) {

        return res.render('index', {title: 'Front End Web Developer', msg: 'This Email is Already Registered with us'});
 
      }
      if(!employeeData) {

        var getAdminData = adminModule.findOne({Email: email});
        getAdminData.exec((err, adminData) => {
          if(err) throw err;
          if(adminData) {

            return res.render('index', {title: 'Front End Web Developer', msg: 'This Email is Already Registered with us'});
 
          }
          next();
        });
      }
      });

    }
    
  });
 }

//Send Sign Up Sending OTP Exactly Correct One
router.post('/signupcustomer', checkUsername, checkMobileNumber, checkEmail,   function(req, res, next) {
  
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.usrname;
  var mobilenumber = req.body.mobilenumber;
  var email = req.body.email;  

  
  var Onetimepassword = crypto.randomBytes(16).toString('hex');

  var customerDetails = new customerModel({
    Firstname: firstname,
    Lastname: lastname,
    Username: username,
    Mobilenumber: mobilenumber,
    Email: email,    
   // Password: password,
    Onetimepassword: Onetimepassword
    });

    customerDetails.save((err )=> {
      if(err) throw err;
//Send OTP Email
      var output = `
    <h3>Hi, Your One Time Password for Account Activation is ${Onetimepassword}</h3>
    <p>Please Enter the One Time Password in the opened link and press Activate Account</p>   
`;
var transporter = nodemailer.createTransport({ 
  service: 'gmail',
  auth: {    
    user: process.env.NODEMAILEMAILUSER,
    pass: process.env.NODEMAILEMAILPASSWORD    
  }
});
var mailOption = {
  from: 'resetpa7@gmail.com',
  to: email, //or use req.body.email
  subject: 'One Time Password (OTP) for Account Authentication',
  html: output
};

transporter.sendMail(mailOption, function(err, info) {
  if(err) {
    res.render('signupcustomer', { title: 'frontendwebdeveloper', msg:'Error Occured, Email Sending failed', adminDetails: ''}); 
  } else {
    res.render('signupcustomer', { title: 'frontendwebdeveloper', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
  }
});      
    });     
  });

  //Customer Sign up sending OTP starts here Exactally Correct

  //Get Sign Up Page
  /* uncomment it later
  router.get('/signupcustomer',  function(req, res, next) {
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
      res.render('signupcustomer', { title: 'Front End Web Developer', msg:''});
    }  
  });
  */

   // Sign up Account Activation with OTP strts here
router.post('/accountactivatedcustomer', function(req, res, next) {
  var oneTimePassword = req.body.otp;
  var password = req.body.password;
  var confirmPassword = req.body.cnfpassword;
  if(password != confirmPassword || password == '' || confirmPassword == '') {
    res.render('signupcustomer', { title: 'frontendwebdeveloper', msg:'Password Not Matched, Please Try again', adminDetails: ''});
  } else {
    password = bcrypt.hashSync(req.body.password, 10);
    var getcustomerDetails = customerModel.findOne({Onetimepassword: oneTimePassword}, {});
    getcustomerDetails.exec((err, ExistingCustomerDetails)=> {
      if(err) throw err;
      if(ExistingCustomerDetails == null || ExistingCustomerDetails == '') {
        res.render('signupcustomer', { title: 'frontendwebdeveloper', msg:'Wrong OTP Entered, Please Try again', adminDetails:''});

      } else {
        var getCustomerId = ExistingCustomerDetails._id;
        
        customerModel.findByIdAndUpdate(getCustomerId, {Onetimepassword: null, Password: password}, {upsert: true}, function(err, updatedCustomerDetails){
          if(err) throw err;           
          res.render('index', { title: 'frontendwebdeveloper', msg:'Account Activated Successfully, You may log in now', adminDetails: ''});
        })
      }      
    });        
  }  
});
// Sign up Account Activation with OTP ends here

//jwt for creating a token
var jwt = require('jsonwebtoken');
// require local storage 
/* uncomment it later if needed
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
*/

//Sign in
/* uncomment it later
router.post('/signin', function(req, res, next) {

  var username = req.body.uname;
  var password = req.body.password;
  var checkUserNameInCustomerData = customerModel.findOne({Username: username});
  var checkUserNameInEmployeesData = employeesModel.findOne({Username: username});
  var checkUserNameInAdminData = adminModule.findOne({Username: username});

  checkUserNameInCustomerData.exec((err, customerData) => {
    if(err) throw err;

    if(customerData != null) {
      
      //Get Password from database
      var getPasswordFromCustomersData = customerData.Password; 
      //Get User Id from database to use in jwt
      var getUserIDFromCustomersData = customerData._id;
      if(bcrypt.compareSync(password, getPasswordFromCustomersData)) {
        if(customerData.Onetimepassword != null) {
          res.render('forgotpassword', { title: 'frontendwebdeveloper', msg:'Please reset your password for seurity purposes, otherwise you will not be able to sign in' });
        } else { 
          var customerToken = jwt.sign({userID: getUserIDFromCustomersData}, process.env.CUSTOMER_LOGIN_TOKEN_ACCESS_KEY /*, {expiresIn: 600 /*86400 = 24 hours}*/
            /* uncomment it later

            );
        /* uncomment it later  
          
          localStorage.setItem('customerLoginTokenName', customerToken);
          localStorage.setItem('customerLoginUserName', username);
          res.redirect('/dashboardcustomer');
        }
      } else {
        res.render('index', { title: 'frontendwebdeveloper', msg:'Invalid Password' });
      }  
      
    } else if(customerData == null) {

      checkUserNameInEmployeesData.exec((err, employeeData ) => {
        if(err) throw err;
        if(employeeData != null) {

          //Get Password from database
        var getPasswordFromEmployeeData = employeeData.Password; 
        //Get User Id from database to use in jwt
        var getUserIDFromEmployeeData = employeeData._id;
        
        if(bcrypt.compareSync(password, getPasswordFromEmployeeData)) {
          if(employeeData.Onetimepassword != null) {
            res.render('forgotpassword', { title: 'frontendwebdeveloper', msg:'Please reset your password for seurity purposes, otherwise you will not be able to sign in' });
          } else { 
            var employeeToken = jwt.sign({userID: getUserIDFromEmployeeData}, process.env.CUSTOMER_LOGIN_TOKEN_ACCESS_KEY /*, {expiresIn: 600 /*86400 = 24 hours}*/
              /* uncomment it later
              );
           
            /* uncomment it later
           
            localStorage.setItem('employeeLoginTokenName', employeeToken);
            localStorage.setItem('employeeLoginUserName', username);
            res.redirect('/dashboardemployees');
          }
        } else {
          res.render('index', { title: 'frontendwebdeveloper', msg:'Invalid Password' });
        }  
     

        } /*if(employeeData != null) { enda*/
          /* uncomment it later
          else if(employeeData == null) {
          checkUserNameInAdminData.exec((err, adminData) => {
            if(err) throw err;

            if(adminData != null) {
              //Get Password from database
        var getPasswordFromAdminData = adminData.Password; 
        //Get User Id from database to use in jwt
        var getUserIDFromAdminData = adminData._id;

        if(bcrypt.compareSync(password, getPasswordFromAdminData)) {
          if(adminData.Onetimepassword != null) {
            res.render('forgotpassword', { title: 'frontendwebdeveloper', msg:'Please reset your password for seurity purposes, otherwise you will not be able to sign in' });
          } else { 
            var adminToken = jwt.sign({userID: getUserIDFromAdminData}, process.env.CUSTOMER_LOGIN_TOKEN_ACCESS_KEY /*, {expiresIn: 600 /*86400 = 24 hours}*/
              /* uncomment it later
              );
            
            /* uncomment it later

            localStorage.setItem('adminLoginTokenName', adminToken);
            localStorage.setItem('adminLoginUserName', username);
            res.redirect('/dashboardadmin');
          }
        } else {
          res.render('index', { title: 'frontendwebdeveloper', msg:'Invalid Password' });
        }  

            }/* if(adminData != null) { */
              /* uncomment it later
              else{
              res.render('index', { title: 'frontendwebdeveloper', msg:'Invalid Username' });
            }


          });
        }

      });
    } //else if(customerData == null) {ends

  });
});
 
uncomment it later */
      




//Sign in
/*
function authenticateCustomerToken(req, res, next ) {
 const authHeader = req.headers['authorization']
  //Bearer TOKEN 
  const token = authHeader && authHeader.split('')[1]
  if(token == null) {
    return res.render('index', { title: 'frontendwebdeveloper', msg:'No Access to Sign in Token, try again' });

  } else {
    jwt.verify(token, process.env.CUSTOMER_LOGIN_TOKEN_ACCESS_KEY, (err, {userID: getUserIDFromCustomersData}) => {
      if(err) throw
    })
  }
  
}
*/
router.post('/signin', function(req, res, next) {

  var username = req.body.uname;
  var password = req.body.password;
  var checkUserNameInCustomerData = customerModel.findOne({Username: username});
  var checkUserNameInEmployeesData = employeesModel.findOne({Username: username});
  var checkUserNameInAdminData = adminModule.findOne({Username: username});

  checkUserNameInCustomerData.exec((err, customerData) => {
    if(err) throw err;

    if(customerData != null) {
      
      //Get Password from database
      var getPasswordFromCustomersData = customerData.Password; 
      //Get User Id from database to use in jwt
      var getUserIDFromCustomersData = customerData._id;
      if(bcrypt.compareSync(password, getPasswordFromCustomersData)) {
        if(customerData.Onetimepassword != null) {
          res.render('forgotpassword', { title: 'frontendwebdeveloper', msg:'Please reset your password for seurity purposes, otherwise you will not be able to sign in' });
        } else { 
          var customerToken = jwt.sign({userID: getUserIDFromCustomersData}, process.env.CUSTOMER_LOGIN_TOKEN_ACCESS_KEY /*, {expiresIn: 600 /*86400 = 24 hours}*/            

            );
        
          
          // localStorage.setItem('customerLoginTokenName', customerToken);
          // localStorage.setItem('customerLoginUserName', username);
          //using session
          req.session.customerLoginUserName = username;
          //res.render('dashboardcustomer', {title: 'frontendwebdeveloper', msg: '',customerToken: customerToken} )
          res.redirect('/dashboardcustomer');
        }
      } else {
        res.render('index', { title: 'frontendwebdeveloper', msg:'Invalid Password' });
      }  
      
    } else if(customerData == null) {

      checkUserNameInEmployeesData.exec((err, employeeData ) => {
        if(err) throw err;
        if(employeeData != null) {

          //Get Password from database
        var getPasswordFromEmployeeData = employeeData.Password; 
        //Get User Id from database to use in jwt
        var getUserIDFromEmployeeData = employeeData._id;
        
        if(bcrypt.compareSync(password, getPasswordFromEmployeeData)) {
          if(employeeData.Onetimepassword != null) {
            res.render('forgotpassword', { title: 'frontendwebdeveloper', msg:'Please reset your password for seurity purposes, otherwise you will not be able to sign in' });
          } else { 
            var employeeToken = jwt.sign({userID: getUserIDFromEmployeeData}, process.env.CUSTOMER_LOGIN_TOKEN_ACCESS_KEY /*, {expiresIn: 600 /*86400 = 24 hours}*/
              
              );
           
            
           
            // localStorage.setItem('employeeLoginTokenName', employeeToken);
            // localStorage.setItem('employeeLoginUserName', username);
            req.session.employeeLoginUserName = username;
            res.redirect('/dashboardemployees');
          }
        } else {
          res.render('index', { title: 'frontendwebdeveloper', msg:'Invalid Password' });
        }  
     

        } /*if(employeeData != null) { enda*/
          
          else if(employeeData == null) {
          checkUserNameInAdminData.exec((err, adminData) => {
            if(err) throw err;

            if(adminData != null) {
              //Get Password from database
        var getPasswordFromAdminData = adminData.Password; 
        //Get User Id from database to use in jwt
        var getUserIDFromAdminData = adminData._id;

        if(bcrypt.compareSync(password, getPasswordFromAdminData)) {
          if(adminData.Onetimepassword != null) {
            res.render('forgotpassword', { title: 'frontendwebdeveloper', msg:'Please reset your password for seurity purposes, otherwise you will not be able to sign in' });
          } else { 
            var adminToken = jwt.sign({userID: getUserIDFromAdminData}, process.env.CUSTOMER_LOGIN_TOKEN_ACCESS_KEY /*, {expiresIn: 600 /*86400 = 24 hours}*/
              
              );
            
            

            // localStorage.setItem('adminLoginTokenName', adminToken);
            // localStorage.setItem('adminLoginUserName', username);
            req.session.adminLoginUserName = username;
            res.redirect('/dashboardadmin');
          }
        } else {
          res.render('index', { title: 'frontendwebdeveloper', msg:'Invalid Password' });
        }  

            }/* if(adminData != null) { */
              
              else{
              res.render('index', { title: 'frontendwebdeveloper', msg:'Invalid Username' });
            }


          });
        }

      });
    } //else if(customerData == null) {ends

  });
});
 


module.exports = router;

