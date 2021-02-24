var express = require('express');
var router = express.Router();

var outboxModel = require('../modules/outboxschema');
//nodemailer for sending emails from website to clients
var nodemailer = require('nodemailer');
  /* GET home page. */
  router.get('/', function(req, res, next) {
    var loginUserAdmin = req.session.adminLoginUserName;
    if(loginUserAdmin) {
  
      outboxModel.find({}).exec((err, outBoxData) => {
        if(err) throw err;
  
        if(outBoxData != null) {
          res.render('outbox', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUserAdmin, outBoxData: outBoxData});
   
        } else {
          res.render('dashboardadmin', { title: 'SareGaMa Music Academy & GMP Studio', msg:'Outbox Empty', loginUser: loginUserAdmin, outBoxData: ''});
   
        }
      });
  
    } else {
      res.redirect('/');
    }
   });
   

  // Reply Email from website to any email id starts here
/*
  router.post('/replyfromoutbox', function(req, res, next) {
  //var loginUser = localStorage.getItem('loginUserName');
 var loginUser = localStorage.getItem('adminLoginUserName')
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
//Nodemailer ends here
});
});
// Reply Email from website to any email id ends here

*/
 
module.exports = router;
