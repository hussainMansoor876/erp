const mongoose = require('mongoose');

const LabourSchema = new mongoose.Schema({
    name:{type:String},
    father_name:{type:String},
    cnic:{type:String},
    address:{type:String},
    p_address:{type:String},
    email:{type:String},
    telephone:{type:String},
    mobile:{type:String},
    dob:{type:String},
    marital_status:{type:String},
    education:{type:Object,default:{}},
    experiences:{type:Object,default:{}},

});
module.exports = mongoose.model('labours',LabourSchema);