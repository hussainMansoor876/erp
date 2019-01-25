const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    employee_id:{type:String},
    employee_name:{type:String},
    dept:{type:String},
    designation:{type:String},
    date:{type:String},
    due_date:{type:String},
    threshold:{type:String},
    assigned_by:{type:String},
    title:{type:String},
    detail:{type:String},
    file:{type:String},
    done:{type:Boolean,default:false},
    active:{type:Boolean,default:true}
});
module.exports = mongoose.model('tasks',TaskSchema);