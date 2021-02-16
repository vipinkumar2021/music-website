var express = require('express');
var router = express.Router();

var adminModule = require('../modules/adminschema');
var customerModel = require('../modules/customersignupschema');
var employeesModel = require('../modules/employeessignupschema');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Music-Website', msg: '' });
});

module.exports = router;

