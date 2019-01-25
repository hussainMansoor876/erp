const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    code:{type:String},
    id:{type:String},
    name:{type:String,default:''},
    completed:{type:Boolean,default:false},
    payment_cleared:{type:Boolean,default:false},
    dept_1:{type:Object,default:{cleared:false}},
    dept_2:{type:Object,default:{cleared:false}},
    dept_3:{type:Object,default:{cleared:false}},
    access_by:{type:Array,default:[]}
});
module.exports = mongoose.model('projects',ProjectSchema);