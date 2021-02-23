var express = require('express');
var router = express.Router();
const customerModel = require('../modules/customersignupschema');

/* GET home page. */

router.get('/',  function(req, res, next) {
        var loginUserAdmin = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName');
    
    if(loginUserAdmin){
        
        var getClientsData = customerModel.find({});
        getClientsData.exec((err, clientsData)=> {
            if(err) throw err;
            res.render('clientslist', { title: 'SaReGaMa Music Academy & GMP Studio', loginUser: loginUserAdmin, clientsData: clientsData });
        });
    } else {
        res.redirect('index');
    }
  });
  
  
module.exports = router;
