const mongoose = require('mongoose');

const Applicants = new mongoose.Schema({
    name:{type:String},
    father_name:{type:String},
    cnic:{type:String},
    address:{type:String},
    p_address:{type:String},
    email:{type:String},
    telephone:{type:String},
    mobile:{type:String},
    dob:{type:String},
    active:{type:Boolean,default:true},
    applied_date:{type:Number}
});
module.exports = mongoose.model('applicants',Applicants);