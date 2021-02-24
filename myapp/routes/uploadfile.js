var express = require('express');
var router = express.Router();

//var outboxModel = require('../modules/outboxschema');
var uploadFileModel = require('../modules/uploadschema');
//nodemailer for sending emails from website to clients
var nodemailer = require('nodemailer');
  /* GET home page. */
  router.get('/',  function(req, res, next) {
    var loginUser = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName');
  
    if(loginUser) {
        res.render('uploadfile', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUser});
      } else {
        res.redirect('admin');
      }   
    });   
  
  
  /*
  router.get('/',  function(req, res, next) {
    var loginUser = {
      loginUserCustomer: req.session.adminLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.adminLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
    };

    

      if(loginUser.loginUserCustomer) {
        res.render('uploadfile', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUser.loginUserCustomer });
      } else if(loginUser.loginUserEmployee){
        res.render('uploadfile', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUser.loginUserEmployee });
      } else if(loginUser.loginUserAdmin) {
        res.render('uploadfile', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUser.loginUserAdmin});
      } else {
        res.redirect('/');
      }   
        
  });
*/
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

router.post('/upload', upload, function(req, res, next) {
  var loginUser = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName')
  
  if(loginUser) {

    var imageDetails = new uploadFileModel({
      Filename: req.file.filename
    });

    imageDetails.save((err) => {
      if(err) throw err;
      res.render('uploadfile', { title: 'SareGaMa Music Academy & GMP Studio', msg:'Image Uploaded Successfully', loginUser: loginUser});


    });
  }
  
});
  //Video File upload below experimental
  //init upload
/*const uploadvideo = multer({
  storage: storage,
  limits: {fileSize: 1000000000000000},
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('uploadvideo');
// Check file type
function checkFileType(file, cb) {
  // Allowed File extentions
  const fileTypes = /MP4|MPEG-4/;
  //Check the Extentions
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if(mimetype && extName) {
    return cb(null, true);
  } else {
    cb('Error: Videos Only!');
  }
}
router.post('/uploadvideo', uploadvideo, function(req, res, next) {
  var loginUser = localStorage.getItem('adminLoginUserName')
  
  if(loginUser) {

    var imageDetails = new uploadFileModel({
      Filename: req.file.filename
    });

    imageDetails.save((err) => {
      if(err) throw err;
      res.render('uploadfile', { title: 'SareGaMa Music Academy & GMP Studio', msg:'Video Uploaded Successfully', loginUser: loginUser});


    });
  }
  
});

 */
module.exports = router;
