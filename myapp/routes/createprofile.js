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

//jwt for creating a token
var jwt = require('jsonwebtoken');
// require local storage
/*
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
*/
/* GET home page. */
  /*
  router.get('/',  function(req, res, next) {
    var loginUser = {
      loginUserCustomer: localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: localStorage.getItem('adminLoginUserName')
    };

    if(loginUser.loginUserCustomer) {
        res.render('createprofile', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUser.loginUserCustomer });
      } else if(loginUser.loginUserEmployee){
        res.render('createprofile', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUser.loginUserEmployee });
      } else if(loginUser.loginUserAdmin) {
        res.render('createprofile', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUser.loginUserAdmin});
      } else {
        res.redirect('/');
      }   
    });    
 */
router.get('/',  function(req, res, next) {
  var loginUser = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName');

  if(loginUser) {
      res.render('createprofile', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUser});
    } else {
      res.redirect('admin');
    }   
  });   

  
  
  
router.post('/addnewstaff', function(req, res, next) {
  var loginUser = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName');
  //var adminStaffEmail = req.body.email;
  
  adminModule.findOne({Email: req.body.email}, {Email: req.body.email}).exec((err, emailRegisteredInAdminData) => {
    if(err) throw err;
    if(emailRegisteredInAdminData != null) {
      return res.render('createprofile', {title: 'SaReGaMa Music Academy & GMP Studio', msg: 'Email Already Registered in Admin Data', loginUser: loginUser});
    } else {
      customerModel.findOne({Email: req.body.email}, {Email: req.body.email}).exec((err, emailRegisteredInCustomerData) => {
        if(err) throw err;
        if(emailRegisteredInCustomerData != null) {
          return res.render('createprofile', {title: 'SaReGaMa Music Academy & GMP Studio', msg: 'Email Already Registered in Customer Data', loginUser: loginUser});

        } else {
          adminMembersTeamModel.findOne({Email: req.body.email}, {Email: req.body.email}).exec((err, emailRegisteredInAdminMembersTeamData) => {
            if(err) throw err;
            if(emailRegisteredInAdminMembersTeamData != null) {
              return res.render('createprofile', {title: 'SaReGaMa Music Academy & GMP Studio', msg: 'Email Already Registered in Admin Members Team', loginUser: loginUser});

            } else {
              var addNewAdminEmail = new adminMembersTeamModel({
                Email: req.body.email
              });
              addNewAdminEmail.save((err) => {
                if(err) throw err;
                res.render('createprofile', {title: 'SaReGaMa Music Academy & GMP Studio', msg: 'Admin Email Registered Successfully. Admin may register now', loginUser: loginUser});
              })
            }

          });
        }
          
         
      });
    }
  });
});


//Require multer for file upload
var multer = require('multer');
//require path
var path = require('path');
router.use(express.static(path.join(__dirname, './public/')));
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


//Exactly Correct one so far
router.post('/dashboardsignupadmin', upload, function(req, res, next) {
  var loginUser = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName')
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.usrname;
  var mobilenumber = req.body.mobilenumber;
  var email = req.body.email; 
  var nationalid = req.body.nationalid;
  var nationalidimage = req.file.filename;      

  var Onetimepassword = crypto.randomBytes(16).toString('hex');

  if(loginUser) {
      adminModule.findOne({Username: username}, {Username: username}).exec((err, dataUsernameInAdmin) => {
        if(err) throw err;
        if(dataUsernameInAdmin != null) {
          //res.render('dashboardadmin', { title: 'Frontend Webdeveloper', loginUser: loginUser.loginUserAdmin, staffdata: '', staffid: '', msg: '', file: '', uploadedImage: '', savedData: savedData });
          return res.render('dashboardadmin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username Already Exists in Admin Data', loginUser: loginUser, savedData: '', staffid: ''});
        } else {
          //
          customerModel.findOne({Username: username}).exec((err, dataUsernameInCustomers) => {
            if(err) throw err;
            if(dataUsernameInCustomers != null) {
              return res.render('dashboardadmin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username Already Exists in Customer Data', loginUser: loginUser, savedData: '', staffid: ''});

            } else {
              //
              adminModule.findOne({Mobilenumber: mobilenumber}, {Mobilenumber: mobilenumber}).exec((err, dataMobileNumberInAdmin) => {
                if(err) throw err;
                if(dataMobileNumberInAdmin != null) {
                  //return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Mobile Number Already Registered in Admin Data' });
                  return res.render('dashboardadmin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Mobile Number Already Registered in Admin Data', loginUser: loginUser, savedData: '', staffid: ''});

                } else {
                  //
                  customerModel.findOne({Mobilenumber: mobilenumber}, {Mobilenumber: mobilenumber}).exec((err, dataMobileNumberInCustomer) => {
                    if(err) throw err;
                    if(dataMobileNumberInCustomer != null) {
                      //return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Mobile Number Already Registered in Customer Data' });
                      return res.render('dashboardadmin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Mobile Number Already Registered in Customer Data', loginUser: loginUser, savedData: '', staffid: ''});

                    } else {
                      //
                      adminModule.findOne({Email: email}, {Email: email}).exec((err, dataEmailInAdminData) => {
                        if(err) throw err;
                        if(dataEmailInAdminData != null) {
                          return res.render('dashboardadmin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Email Already Registered in Admin Data', loginUser: loginUser, savedData: '', staffid: '' });
        
                        } else {
                          //
                          customerModel.findOne({Email: email}, {Email: email}).exec((err, dataEmailInCustomerData) => {
                            if(err) throw err;
                            if(dataEmailInCustomerData != null) {
    
                              return res.render('dashboardadmin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Email Already Registered in Customer Data', loginUser: loginUser, savedData: '', staffid: '' });
    
                            } else {
                              //
                              adminModule.findOne({Nationalid :nationalid}, {Nationalid :nationalid}).exec((err, dataNationalIdInAdminData) => {
                                if(err) throw err;
                                if(dataNationalIdInAdminData != null) {
                                 return res.render('dashboardadmin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'National Id Already Registered in Admin Data', loginUser: loginUser, savedData: '', staffid: '' });
     
                                } else {
                                  //
                                  adminMembersTeamModel.findOne({Email: email}, {Email: email}).exec((err, registeredNewAdminMemberEmail) => {
                                    if(err) throw err;
                                    if(registeredNewAdminMemberEmail == null) {
                                      return res.render('dashboardadmin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Please Enter Registered Email Address or Contact Admin', loginUser: loginUser, savedData: '', staffid: ''  });
    
                                    } else {
                                      //
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
                                res.render('dashboardsignupadmin', { title: 'frontendwebdeveloper', msg:'Error Occured, Email Sending failed', adminDetails: '', loginUser: loginUser}); 
                              } else {
                                res.render('dashboardsignupadmin', { title: 'frontendwebdeveloper', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: '', loginUser: loginUser}); 
                              }
                            });     

                                          //

                                        });
                                      //

                                    }
                                  });
                                  //
                                }
                              });

                              //
                            }
                          });

                          //
                        }
                      });

                      //
                    }
                  });

                  //
                }
              });

              //

            }
          });
              //  
            
        }

      });
  }
  
});

router.get('/dashboardsignupadmin',  function(req, res, next) {
  var loginUser = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName');

  if(loginUser) {
      res.render('dashboardsignupadmin', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', adminDetails: '', loginUser: loginUser});
    } else {
      res.redirect('admin');
    }   
  });  


   // Sign up Account Activation for admin with OTP strts here
router.post('/dashboardaccountactivatedadmin', function(req, res, next) {
  var loginUser = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName');

  if(loginUser) {  
  
  var oneTimePassword = req.body.otp;
  var password = req.body.password;
  var confirmPassword = req.body.cnfpassword;
  if(password != confirmPassword || password == '' || confirmPassword == '') {
    res.render('dashboardsignupadmin', { title: 'frontendwebdeveloper', msg:'Password Not Matched, Please Try again', adminDetails: '', loginUser: loginUser});
  } else {
    password = bcrypt.hashSync(req.body.password, 10);
    var getAdminDetails = adminModule.findOne({Onetimepassword: oneTimePassword}, {});
    getAdminDetails.exec((err, ExistingAdminDetails)=> {
      if(err) throw err;
      if(ExistingAdminDetails == null || ExistingAdminDetails == '') {
        res.render('dashboardsignupadmin', { title: 'frontendwebdeveloper', msg:'Wrong OTP Entered, Please Try again', adminDetails:'', loginUser: loginUser});

      } else {
        var getAdminId = ExistingAdminDetails._id;
        
        adminModule.findByIdAndUpdate(getAdminId, {Onetimepassword: null, Password: password}, {upsert: true}, function(err, updatedAdminDetails){
          if(err) throw err;           
          res.render('dashboardadmin', { title: 'frontendwebdeveloper', msg:'Account Activated Successfully, You may log in now', adminDetails: '', loginUser: loginUser, savedData: '', staffid: '' });
        })
      }      
    });        
  }
  //
} else {
  res.redirect('admin');
}
//

});
// Sign up Account Activation for admin with OTP ends here

  
   
module.exports = router;
