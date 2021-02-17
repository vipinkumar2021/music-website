var mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASEADMIN, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var uploadSchema = new mongoose.Schema({

Filename: {
    type: String
},
Date: {
    type: Date,
    default: Date.now
}
});

var uploadModel = mongoose.model('uploaded_files', uploadSchema);
module.exports = uploadModel;