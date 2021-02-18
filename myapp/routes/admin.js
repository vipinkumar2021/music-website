var express = require('express');
var router = express.Router();

var adminModule = require('../modules/adminschema');
var customerModel = require('../modules/customersignupschema');
var employeesModel = require('../modules/employeessignupschema');
var adminMembersTeamModel = require('../modules/adminmembersteamschema');

// require dot env
require('dotenv').config();
//Crypto for creating randombytes key
var crypto = require('crypto');
//nodemailer for sending emails from website to clients
var nodemailer = require('nodemailer');

//encrypt passwords using bcrypt
var bcrypt = require('bcryptjs');

/* GET home page. */
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
    res.render('admin', { title: 'SaReGaMa Music Academy & GMP Studio', msg:''});
  }  
});



//middleware
//Check LoginUser
/*
function checkLoginUser(req, res, next) {
  var getLoginToken = localStorage.getItem('loginTokenName');
  try{
    var decoded = jwt.verify(getLoginToken, process.env.LOGIN_TOKEN_ACCESS_KEY);
  }catch(err) {
    res.redirect('/');
  }
  next();
}
*/
//check existing username
/*
function checkUsername(req, res, next) {
  var username = req.body.usrname;
  var checkExistingUsernameInAdminData = adminModule.findOne({Username: username});
  checkExistingUsernameInAdminData.exec((err, data)=> {
    if(err) throw err;
    if(data) {
      return  res.render('admin', { title: 'frontendwebdeveloper', msg: 'Username Already Taken by Someone' }); 
    }
    var checkExistingUsernameInCustomerData = customerModel.findOne({Username: username});
    checkExistingUsernameInCustomerData.exec((err, data1)=> {
      if(err) throw err;
      if(data1) {
        return  res.render('admin', { title: 'frontendwebdeveloper', msg: 'Username Already Taken by Someone' }); 
      } 
      next();    
    });
  });
}
*/
//check existing mobile number
/*
function checkMobileNumber(req, res, next) {
  var mobilenumber = req.body.mobilenumber;
  var checkExistingMobileNumberInAdminData = adminModule.findOne({Mobilenumber: mobilenumber});
  checkExistingMobileNumberInAdminData.exec((err, data)=> {
    if(err) throw err;
    if(data) {
      return  res.render('admin', { title: 'frontendwebdeveloper', msg: 'This Mobile Number is already registered' }); 
    }
    var checkExistingMobileNumberInCustomerData = customerModel.findOne({Mobilenumber: mobilenumber});
    checkExistingMobileNumberInCustomerData.exec((err, data1)=> {
      if(err) throw err;
      if(data1) {
        return  res.render('admin', { title: 'frontendwebdeveloper', msg: 'This Mobile Number is already registered' }); 
      } 
      next();    
    });
  });
}
*/


//check existing email middleware Exactly Correct
/*
function checkEmail(req, res, next) {
  var email = req.body.email;
 customerModel.findOne({Email: email}).exec((err, customerData) => {
    if(err) throw err;
    if(customerData) {
      return  res.render('admin', { title: 'frontendwebdeveloper', msg: 'Email Already Taken by Someone' }); 

    } else {
      return checkExistingEmailInEmployeeData();
    }
  });;
  function checkExistingEmailInEmployeeData() {

    employeesModel.findOne({Email: email}).exec((err, employeeData) => {
      if(err) throw err;
      if(employeeData) {
        return  res.render('admin', { title: 'frontendwebdeveloper', msg: 'Email Already Taken by Someone' }); 
      } else {
        return checkExistingEmailInAdminData();
      }
    });
  };
  function checkExistingEmailInAdminData() {
    adminModule.findOne({Email: email}).exec((err, adminData) => {
      if(err) throw err;
      if(adminData) {
        return  res.render('admin', { title: 'frontendwebdeveloper', msg: 'Email Already Taken by Someone' }); 
  
      } else {
        return next();
      }
    });
  };
};
*/
/*
function checkEmail(req, res, next) {
  var email = req.body.email;
  var checkExistingEmailInAdminData = adminModule.findOne({Email: email});
  checkExistingEmailInAdminData.exec((err, data)=> {
    if(err) throw err;
    if(data) {
      return  res.render('admin', { title: 'frontendwebdeveloper', msg: 'Email Already Exists' }); 
    }
    var checkExistingEmailInCustomerData = customerModel.findOne({Email: email});
    checkExistingEmailInCustomerData.exec((err, data1)=> {
      if(err) throw err;
      if(data1) {
        return  res.render('admin', { title: 'frontendwebdeveloper', msg: 'Email Already Exists' }); 
      } 
      next();    
    });
  });
}
*/


//check existing National Id middleware
/*function checkNationalId(req, res, next) {
  var nationalid = req.body.nationalid;
  var checkExistingNationalId = adminModule.findOne({Nationalid: nationalid});
  checkExistingNationalId.exec((err, data) => {
    if(err) throw err;
    if(data){
   return res.render('admin', { title: 'frontendwebdeveloper', msg: 'This National Id is already registered' }); 
    }
    next();
  });
}
*/
//Require multer for file upload
var multer = require('multer');
//require path
var path = require('path');
router.use(express.static(path.join(__dirname, './public/uploads/')));
//Set Storage Engine for file to be stored
const storage = multer.diskStorage({
  destination: './public/uploads/', 
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});
//init upload
const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('nationalidimage');
// Check file type
function checkFileType(file, cb) {
  // Allowed File extentions
  const fileTypes = /jpeg|jpg|png|gif/;
  //Check the Extentions
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if(mimetype && extName) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

//admin Sign up sending OTP starts here Experimental One
//middleware
/*
function checkExistingUsername(req, res, next) {
  var username = req.body.usrname;
  var getAdminData = adminModule.findOne({Username: username}, {Username: username});
  getAdminData.exec((err, adminData) => {
    if(err) throw err;
    if(adminData) {
      return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username Already Exists in Admin Data List' });
    } 
    next();
  });
}
*/
/*
function checkUsername(req, res, next) {
  var username = req.body.usrname;
  var getCustomerData = customerModel.findOne({Username: username});
  getCustomerData.exec((err, customerData) => {
    if(err) throw err;
    if(customerData) {

      return res.render('admin', {title: 'Front End Web Developer', msg: 'Username Already Exists in Customer Data'});
    
    }     
    if(!customerData) {

      var getEmployeeData = employeesModel.findOne({Username: username});
      getEmployeeData.exec((err, employeeData) => {
        if(err) throw err;
        if(employeeData) {

        return res.render('admin', {title: 'Front End Web Developer', msg: 'Username Already Exists in Employees Data'});
 
      }
      if(!employeeData) {

        var getAdminData = adminModule.findOne({Username: username});
        getAdminData.exec((err, adminData) => {
          if(err) throw err;
          if(adminData) {

            return res.render('admin', {title: 'Front End Web Developer', msg: 'Username Already Exists in Adminn Data'});
 
          }
          next();
        });
      }
      });

    }
    //
  });
 }
*/
//Exactly Correct one so far
router.post('/signupadmin', upload, function(req, res, next) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.usrname;
  var mobilenumber = req.body.mobilenumber;
  var email = req.body.email; 
  var nationalid = req.body.nationalid;
  var nationalidimage = req.file.filename;      

  var Onetimepassword = crypto.randomBytes(16).toString('hex');

//below is correct one
  adminModule.findOne({Username: username}, {Username: username}).exec((err, dataUsernameInAdmin) => {
      if(err) throw err;
      if(dataUsernameInAdmin != null) {
  
          return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username Already Exists in Admin Data' });
            
      } else {
        
        customerModel.findOne({Username: username}).exec((err, dataUsernameInCustomers) => {
          if(err) throw err;
          if(dataUsernameInCustomers != null) {
            return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username Already Exists in Customer Data' });

          } else {
            
           //next(); // return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username does not Already Exists in Customer Data' });

           adminModule.findOne({Mobilenumber: mobilenumber}, {Mobilenumber: mobilenumber}).exec((err, dataMobileNumberInAdmin) => {
            if(err) throw err;
            if(dataMobileNumberInAdmin != null) {
              return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Mobile Number Already Registered in Admin Data' });
    
            } else {
              customerModel.findOne({Mobilenumber: mobilenumber}, {Mobilenumber: mobilenumber}).exec((err, dataMobileNumberInCustomer) => {
                if(err) throw err;
                if(dataMobileNumberInCustomer != null) {
                  return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Mobile Number Already Registered in Customer Data' });

                } else {
                  adminModule.findOne({Email: email}, {Email: email}).exec((err, dataEmailInAdminData) => {
                    if(err) throw err;
                    if(dataEmailInAdminData != null) {
                      return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Email Already Registered in Admin Data' });
    
                    } else {
                      //next();
                      //return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Email Already not Registered in Admin Data' });
                      customerModel.findOne({Email: email}, {Email: email}).exec((err, dataEmailInCustomerData) => {
                        if(err) throw err;
                        if(dataEmailInCustomerData != null) {

                          return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Email Already Registered in Customer Data' });

                        } else {
                          //next();
                          adminModule.findOne({Nationalid :nationalid}, {Nationalid :nationalid}).exec((err, dataNationalIdInAdminData) => {
                           if(err) throw err;
                           if(dataNationalIdInAdminData != null) {
                            return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'National Id Already Registered in Admin Data' });

                           } else {
                              adminMembersTeamModel.findOne({Email: email}, {Email: email}).exec((err, registeredNewAdminMemberEmail) => {
                                if(err) throw err;
                                if(registeredNewAdminMemberEmail == null) {
                                  return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Please Enter Registered Email Address or Contact Admin' });

                                } else {                              
                             //
                             //
                            //return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'National Id Already not Registered in Admin Data' });
                            var adminDetails = new adminModule({
                              Firstname: firstname,
                              Lastname: lastname,
                              Username: username,
                              Mobilenumber: mobilenumber,
                              Email: email,   
                              Nationalid: nationalid,
                              Imagename: nationalidimage,
                              
                              Onetimepassword: Onetimepassword
                              });
                          
                              adminDetails.save((err )=> {
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
                              res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Error Occured, Email Sending failed', adminDetails: ''}); 
                            } else {
                              res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
                            }
                          });      
                              });  
                              //
                            }
                          });
                              //
                           }                       
                            
                          });


                        }

                      });
                    }


                  });
                  /*next();*/ // return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Mobile Number does not Already Registered in Customer Data' });

                }
              });
            }

          });

           //
          }
        });        
      } 

    });

});

//Exactly Correct One part 2
/*
router.post('/signupadmin', upload, function(req, res, next) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.usrname;
  var mobilenumber = req.body.mobilenumber;
  var email = req.body.email; 
  var nationalid = req.body.nationalid;
  var nationalidimage = req.file.filename;      

  var Onetimepassword = crypto.randomBytes(16).toString('hex');

//below is correct one
  adminModule.findOne({Username: username}, {Username: username}).exec((err, dataUsernameInAdmin) => {
      if(err) throw err;
      if(dataUsernameInAdmin != null) {
  
          return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username Already Exists in Admin Data' });
            
      } else {
        
        customerModel.findOne({Username: username}).exec((err, dataUsernameInCustomers) => {
          if(err) throw err;
          if(dataUsernameInCustomers != null) {
            return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username Already Exists in Customer Data' });

          } else {
            
           //next(); // return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username does not Already Exists in Customer Data' });

           adminModule.findOne({Mobilenumber: mobilenumber}, {Mobilenumber: mobilenumber}).exec((err, dataMobileNumberInAdmin) => {
            if(err) throw err;
            if(dataMobileNumberInAdmin != null) {
              return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Mobile Number Already Registered in Admin Data' });
    
            } else {
              customerModel.findOne({Mobilenumber: mobilenumber}, {Mobilenumber: mobilenumber}).exec((err, dataMobileNumberInCustomer) => {
                if(err) throw err;
                if(dataMobileNumberInCustomer != null) {
                  return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Mobile Number Already Registered in Customer Data' });

                } else {
                  adminModule.findOne({Email: email}, {Email: email}).exec((err, dataEmailInAdminData) => {
                    if(err) throw err;
                    if(dataEmailInAdminData != null) {
                      return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Email Already Registered in Admin Data' });
    
                    } else {
                      //next();
                      //return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Email Already not Registered in Admin Data' });
                      customerModel.findOne({Email: email}, {Email: email}).exec((err, dataEmailInCustomerData) => {
                        if(err) throw err;
                        if(dataEmailInCustomerData != null) {

                          return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Email Already Registered in Customer Data' });

                        } else {
                          //next();
                          adminModule.findOne({Nationalid :nationalid}, {Nationalid :nationalid}).exec((err, dataNationalIdInAdminData) => {
                           if(err) throw err;
                           if(dataNationalIdInAdminData != null) {
                            return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'National Id Already Registered in Admin Data' });

                           } else {
                             //
                             //
                            //return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'National Id Already not Registered in Admin Data' });
                            var adminDetails = new adminModule({
                              Firstname: firstname,
                              Lastname: lastname,
                              Username: username,
                              Mobilenumber: mobilenumber,
                              Email: email,   
                              Nationalid: nationalid,
                              Imagename: nationalidimage,
                              
                              Onetimepassword: Onetimepassword
                              });
                          
                              adminDetails.save((err )=> {
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
                              res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Error Occured, Email Sending failed', adminDetails: ''}); 
                            } else {
                              res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
                            }
                          });      
                              });     

                           }                       
                            
                          });


                        }

                      });
                    }


                  });
                  /*next();*/ // return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Mobile Number does not Already Registered in Customer Data' });
/*
                }
              });
            }
          });

           
          }
        });        
      } 
    });

});
*/
/* experimental
router.post('/signupadmin', upload, function(req, res, next) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.usrname;
    var mobilenumber = req.body.mobilenumber;
    var email = req.body.email; 
    var nationalid = req.body.nationalid;
    var nationalidimage = req.file.filename;      

    var Onetimepassword = crypto.randomBytes(16).toString('hex');

  //below is correct one
    adminModule.findOne({Username: username}, {Username: username}).exec((err, data) => {
        if(err) throw err;
        if(data != null) {

        /*  var getUsernameFromAdminData = data.Username;
          if(username == getUsernameFromAdminData) { */
        //    return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username Already Exists in Admin Data' });
        //  }
     /*    
        }
        next();
      });
/*
      customerModel.findOne({Username: username}, {Username: username}).exec((err, customerData) => {
        if(err) throw err;
        if(customerData != null) {

        /*  var getUsernameFromAdminData = data.Username;
          if(username == getUsernameFromAdminData) { */
       //     return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username Already Exists in Customer Data' });
        //  }
         
      //  }
     //   next();
     //  });
   
    /*
    var existingMobilenumber = '09813806752';      
    var existingEmail = 'resetpa7@gmail.com';    
    var existingNationalid = 'Vipin Kumar Kamboj';
/*
    if(username == existingUsername) {
      return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username Already Exists' });
    }
      */ 
     /*
    if(mobilenumber == existingMobilenumber) {
      return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Mobile Number Already Registered' });
    }
    if(email == existingEmail) {
      return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Email Already Registered', });
    }
    if(nationalid == existingNationalid) {
      return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'National Id Already Registered', });
    }
    */
   /*
    var adminStaffDetails = new adminModule({
      Firstname: firstname,
      Lastname: lastname,
      Username: username,
      Mobilenumber: mobilenumber,
      Email: email,   
      Nationalid: nationalid,
      Imagename: nationalidimage,
      
      Onetimepassword: Onetimepassword
    });
    adminStaffDetails.save((err, adminData) => {
      if(err) throw err;
//
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
      res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Error Occured, Email Sending failed', adminDetails: ''}); 
    } else {
      res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
    }
  });      

  //
    }); 



});
/* start this one
router.post('/signupadmin', upload, function(req, res, next) {
  var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.usrname;
    var mobilenumber = req.body.mobilenumber;
    var email = req.body.email; 
    var nationalid = req.body.nationalid;
    var nationalidimage = req.file.filename;  
  
    var Onetimepassword = crypto.randomBytes(16).toString('hex');
    var checkExistingUsername = adminModule.findOne({Username: username});
   checkExistingUsername.exec((err, adminData) => {
    if(err) throw err;
    if(adminData) {

      var usernameFromAdminData =  adminData.Username
        if(usernameFromAdminData) {
          return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username Already Exists in Admin Data', adminData: adminData });
        }


    } else {


      customerModel.findOne().exec((err, customerData) => {

        if(err) throw err;

        if(customerData) { 
          var usernameFromCustomerData = customerData.Username;
          if(usernameFromCustomerData) {
            return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username Already Exists in Customer Data', adminData: adminData, customerData: customerData });
          }
        } else {

          return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username is eligible to register', adminData: adminData, customerData: customerData });

        }


      });



    }
  });

});
  
   
     
      
           

      
         
          
       
     
    
    
   


   

//Admin Sign up sending OTP ends here Experimental One with image upload



  //admin Sign up sending OTP starts here Exactally Correct One
  /*
  router.post('/signupadmin', checkUsername,/* checkMobileNumber, checkEmail, checkNationalId,*/  /* upload, function(req, res, next) {
  /*  var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.usrname;
    var mobilenumber = req.body.mobilenumber;
    var email = req.body.email; 
    var nationalid = req.body.nationalid;
    var nationalidimage = req.file.filename;  
  
    var Onetimepassword = crypto.randomBytes(16).toString('hex');
  
    var adminDetails = new adminModule({
      Firstname: firstname,
      Lastname: lastname,
      Username: username,
      Mobilenumber: mobilenumber,
      Email: email,   
      Nationalid: nationalid,
      Imagename: nationalidimage,
      
      Onetimepassword: Onetimepassword
      });
  
      adminDetails.save((err )=> {
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
      res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Error Occured, Email Sending failed', adminDetails: ''}); 
    } else {
      res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
    }
  });      
      });     
    });
    */
  //Admin Sign up sending OTP ends here Exactally Correct One with image upload
  
  //Get Sign Up Page
  router.get('/signupadmin',  function(req, res, next) {
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
      res.render('signupadmin', { title: 'Front End Web Developer', msg:''});
    }  
  });
  // Sign up Account Activation with OTP strts here
router.post('/accountactivatedadmin', function(req, res, next) {
  var oneTimePassword = req.body.otp;
  var password = req.body.password;
  var confirmPassword = req.body.cnfpassword;
  if(password != confirmPassword || password == '' || confirmPassword == '') {
    res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Password Not Matched, Please Try again', adminDetails: ''});
  } else {
    password = bcrypt.hashSync(req.body.password, 10);
    var getAdminDetails = adminModule.findOne({Onetimepassword: oneTimePassword}, {});
    getAdminDetails.exec((err, ExistingAdminDetails)=> {
      if(err) throw err;
      if(ExistingAdminDetails == null || ExistingAdminDetails == '') {
        res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Wrong OTP Entered, Please Try again', adminDetails:''});

      } else {
        var getAdminId = ExistingAdminDetails._id;
        
        adminModule.findByIdAndUpdate(getAdminId, {Onetimepassword: null, Password: password}, {upsert: true}, function(err, updatedAdminDetails){
          if(err) throw err;           
          res.render('admin', { title: 'frontendwebdeveloper', msg:'Account Activated Successfully, You may log in now', adminDetails: ''});
        })
      }      
    });        
  }  
});
// Sign up Account Activation with OTP ends here

//jwt for creating a token
var jwt = require('jsonwebtoken');
// require local storage 
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}














module.exports = router;
