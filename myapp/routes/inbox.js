var express = require('express');
var router = express.Router();

var clientsMessagesModel = require('../modules/contactusschema');
var outboxModel = require('../modules/outboxschema');
//nodemailer for sending emails from website to clients
var nodemailer = require('nodemailer');
  /* GET home page. */
  
 router.get('/', function(req, res, next) {
  var loginUserAdmin = req.session.adminLoginUserName;
  if(loginUserAdmin) {

    clientsMessagesModel.find({}).exec((err, clientsMessagesData) => {
      if(err) throw err;
      if(clientsMessagesData != null) {
        res.render('inbox', { title: 'Front End Web Developer', msg:'', loginUser: loginUserAdmin, clientsMessagesData: clientsMessagesData});
 
      } else {
        res.render('dashboardadmin', { title: 'Front End Web Developer', msg:'Inbox Empty', loginUser: loginUserAdmin, clientsMessagesData: ''});
 
      }
    });

  } else {
    res.redirect('/');
  }
 });
 
  // Reply Email from website to any email id starts here
router.post('/reply', function(req, res, next) {
  //var loginUser = localStorage.getItem('loginUserName');
 var loginUser = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName')
 if(loginUser) {

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

 } else {
  res.redirect('/');
 }
 
});
// Reply Email from website to any email id ends here

 // Forward Email from website to any email id starts here
 router.post('/forwardemail', function(req, res, next) {
  //var loginUser = localStorage.getItem('loginUserName');
 var loginUser = req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  if(loginUser) {

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
 res.render('dashboardadmin', { title: 'frontendwebdeveloper', msg:'Email Forwarded Successfully', loginUser: loginUser, staffdata: '', staffid: '', file: '', uploadedImage: '', savedData: '' });
});
//Nodemailer ends here
});

  } else {
    res.redirect('/');
  }
 
});
// Forward Email from website to any email id ends here

  


module.exports = router;
