var mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASEADMIN, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var cartItemsSchema = new mongoose.Schema({
//Username is must for all three to keep all three data under same username
Username: {
    type: String,
    //required: true,
    /*index: {
        unique: true
    }*/
        
},
//Template Schema
TemplateName: {
    type: String
    
},
TemplatePrice: {
    type: String
},

//Website Features Schema
UserSignUpSignIn: {
    type: String
    
},
UserSignUpSignInPrice: {
    type: String
},
EmployeesSignUpSignIn: {
    type: String
    
},
AdminSignUpSignIn: {
    type: String
},
CompanyLogo: {
    type: String
    
},

ContentManagement: {
    type: String
    
},
DocumentManagement: {
    type: String
},
 
EventCalender: {
    type: String
    
},
EmailNewsLetterSubscription: {
    type: String
    
},
BusinessDirectory: {
    type: String
    
},
OnlinePaymentMethod: {
    type: String
    
},
SocialMediaIntegration: {
    type: String
    
},
TotalForAllFeaturesSelected: {
    type: String
},
//Website Content Schema
CompanyName: {
    type: String
},
CompanyContactNumber: {
    type: String
},
CompanyEmail: {
    type: String
},
CompanyAddress: {
    type: String
},
CompanyServices: {
    type: String
},
CompanyAdditionalInformation: {
    type: String
},
CompanyLogoFile: {
    type: String
},
CompanyFiles: {
    type: String
},
CompanyPhotos: {
    type: String
},

Date: {
    type: Date,
    default: Date.now
}
});

var cartItemsModel = mongoose.model('cartitems', cartItemsSchema);
module.exports = cartItemsModel;