var express = require('express');
var router = express.Router();

var outboxModel = require('../modules/outboxschema');

//nodemailer for sending emails from website to clients
var nodemailer = require('nodemailer');
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
}).single('uploadimage');
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
var adminModule = require('../modules/adminschema');
var uploadModel = require('../modules/uploadschema');
//jwt for creating a token
var jwt = require('jsonwebtoken');
// require local storage 
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
//middleware
//Check LoginUser
function checkLoginUser(req, res, next) {
  var getLoginToken = localStorage.getItem('adminLoginTokenName');
  try{
    var decoded = jwt.verify(getLoginToken, process.env.ADMIN_LOGIN_TOKEN_ACCESS_KEY);
  }catch(err) {
    res.redirect('/');
  }
  next();
}
/* GET home page. */
/* GET home page. */
router.get('/',  function(req, res, next) {
  var loginUser = {
    loginUserCustomer: localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: localStorage.getItem('adminLoginUserName')

  };
  if(loginUser.loginUserCustomer) {
    res.redirect('dashboardcustomer');
    //res.render('dashboardcustomer', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee){
    res.redirect('dashboardemployees');
    //res.render('dashboardemployees', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    var getSavedData = adminModule.findOne({Username: loginUser.loginUserAdmin});
      getSavedData.exec((err, savedData)=> { 

        if(err) throw err;
      res.render('dashboardadmin', { title: 'Frontend Webdeveloper', loginUser: loginUser.loginUserAdmin, staffdata: '', staffid: '', msg: '', file: '', uploadedImage: '', savedData: savedData });
      });
       
   // res.render('dashboardtadmin', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserAdmin});
  } else {
    res.redirect('admin');
  }   
});
/*
router.get('/', checkLoginUser, function(req, res, next) {
    var loginUserAdmin = localStorage.getItem('adminLoginUserName');
      
    var getSavedData = adminModule.findOne({Username: loginUserAdmin});
      getSavedData.exec((err, savedData)=> {
      if(err) throw err;
      res.render('dashboardadmin', { title: 'Frontend Webdeveloper', loginUser: loginUserAdmin, staffdata: '', staffid: '', msg: '', file: '', uploadedImage: '', savedData: savedData });
 
    });   
          
                 
  });
*/


  // Image or File Upload to Gallery
  router.post('/upload', upload, checkLoginUser, function(req, res, next) {
    var loginUser = localStorage.getItem('loginUserName');
               
              var uploadFileName = req.file.filename;
              var uploadDetails = new uploadModel({
                Filename: uploadFileName
              });
              uploadDetails.save((err)=> {
                if(err) throw err;
              uploadModel.find({}).exec((err, uploadedImage)=> {
                if(err) throw err;
                res.render('dashboardadmin', { title: 'Frontend Webdeveloper', loginUser: loginUser, staffdata: '', staffid: '', msg: 'File Uploaded Successfully', file: '', uploadedImage: '', savedData: '' });

              });             
                
              });       
              });      
    
              

              
// Send Email from website to any email id starts here
router.post('/Send', function(req, res, next) {
  var loginUser = localStorage.getItem('adminLoginUserName')
  //var loginUser = localStorage.getItem('loginUserName');
  var messageto = req.body.messageto;  
  var output = `
  <h3>Contact Details</h3>
  <ul>
    <li>Company: SaReGaMa Music Academy & GMP Studio</li>
    <li>Email: companyemail@email.com....demo for now</li>
    <li>Contact Number: 00800 ...demo for now...</li>    
  </ul>
    <h3>Message</h3>
    <p>${req.body.writemessage}</p>  
  `;  

  //Nodemailer strts here...
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    
    user: process.env.NODEMAILEMAILUSER,
    pass: process.env.NODEMAILEMAILPASSWORD
    
  }
});

var mailOption = {
  from: 'resetpa7@gmail.com',
  to: messageto ,
  subject: 'You got a new msg from Vipin',
  html: output
};

var outboxDetails = new outboxModel({
  MessageTo: messageto,
  Message: req.body.writemessage
}); 
outboxDetails.save((err) => {
  if(err) throw err;  

transporter.sendMail(mailOption, function(err, info) {
  if(err) throw err;
  res.render('dashboardadmin', { title: 'frontendwebdeveloper', msg:'Email Sent Successfully', loginUser: loginUser, staffdata: '', staffid: '', file: '', uploadedImage: '', savedData: '' });
});
});
//Nodemailer ends here
});
// Send Email from website to any email id ends here


module.exports = router;
