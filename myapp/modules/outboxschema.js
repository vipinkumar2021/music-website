var mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASEADMIN, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var OutboxSchema = new mongoose.Schema({

MessageTo: {
    type: String,
    required: true
},

Message: {
    type: String,
    required: true
},
Date: {
    type: Date,
    default: Date.now
}
});

var outboxModel = mongoose.model('outbox', OutboxSchema);
module.exports = outboxModel;