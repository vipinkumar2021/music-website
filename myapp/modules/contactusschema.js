var mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASEADMIN, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var contactUsSchema = new mongoose.Schema({

Firstname : {
    type: String,
    required: true
},
Lastname: {
    type: String,
    required: true
},
Mobilenumber : {
    type: String,
    required: true
},
Email: {
    type: String,
    required: true
    
},
WriteMessage: {
    type: String,
    required: true
},
Date: {
    type: Date,
    default: Date.now
}
});

var contactUsModel = mongoose.model('clientsmessages', contactUsSchema);
module.exports = contactUsModel;