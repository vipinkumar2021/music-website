var mongoose = require('mongoose');
require('dotenv').config();
var uri = process.env.DATABASEADMIN
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
    useCreateIndex: true});

var conn = mongoose.Collection;

var recycleBinSchema = new mongoose.Schema({

    DeletedCustomerAccountDetails: {
    type: String    
},
DeletedEmployeeAccountDetails: {
    type: String    
},
DeletedAdminAccountDetails: {
    type: String    
},
DeletedClientMessageDetails: {
    type: String    
},
DeletedOutboxMessageDetails: {
    type: String
},
Date: {
    type: Date,
    default: Date.now
}
});

var recycleBinModel = mongoose.model('recyclebin', recycleBinSchema);
module.exports = recycleBinModel;