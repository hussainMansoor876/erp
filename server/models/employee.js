const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name:{type:String},
    father_name:{type:String},
    cnic:{type:String},
    father_cnic:{type:String},
    address:{type:String},
    city:{type:String},
    email:{type:String},
    telephone:{type:String},
    mobile:{type:String},
    ext:{type:String},
    religion:{type:String},
    age:{type:Number},
    marital_status:{type:String},
    education:{type:Object,default:{}},
    experiences:{type:Object,default:{}},
    basic_salary:{type:Number,default:0},
    designation:{type:String},
    active:{type:Boolean,default:true},
    dept:{type:String},
    picture:{type:String},
    username:{type:String},
    password:{type:String},
    previledge:{type:Array,default:[]}
});
module.exports = mongoose.model('employees',EmployeeSchema);