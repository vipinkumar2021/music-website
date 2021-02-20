var express = require('express');
var router = express.Router();
var adminModule = require('../modules/adminschema');
/* GET home page. */

router.get('/',  function(req, res, next) {
        var loginUserAdmin = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName');
    
    if(loginUserAdmin){
        
        var getAdminStaffData = adminModule.find({});
        getAdminStaffData.exec((err, adminStaffData)=> {
            if(err) throw err;
            res.render('adminstafflist', { title: 'Frontend Development', loginUser: loginUserAdmin, adminStaffData: adminStaffData });
        });
    } else {
        res.redirect('index');
    }
  });
  

  router.get('/:id',  function(req, res, next) {
    var loginUserAdmin = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName');

if(loginUserAdmin){
    var id = req.params.id;
    var getAdminStaffDataForViewAdminModal = adminModule.findOne({_id: id});
    getAdminStaffDataForViewAdminModal.exec((err, adminStaffDataForViewAdminModal)=> {
        if(err) throw err;
        res.render('adminstafflist', { title: 'Frontend Development', loginUser: loginUserAdmin, adminStaffData: adminStaffData, adminStaffDataForViewAdminModal: adminStaffDataForViewAdminModal });
    });
} else {
    res.redirect('index');
}
});

  
  
module.exports = router;
