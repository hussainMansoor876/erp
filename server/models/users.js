const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{type:String,default:''},
    username:{type:String},
    password:{type:String},
    previledge:{type:Array,default:[]}
});
module.exports = mongoose.model('users',UserSchema);