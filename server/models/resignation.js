const mongoose = require('mongoose');

const ResignationSchema = new mongoose.Schema({
    employee_id:{type:String},
    employee_name:{type:String},
    dept:{type:String},
    designation:{type:String},
    date:{type:String},
    reason:{type:String},
    read:{type:Boolean,default:false},
    status:{type:Number,default:0}, // 0-> applied , 1->approved , -1->rejected
    active:{type:Boolean,default:true}
});
module.exports = mongoose.model('resignations',ResignationSchema);