const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    title: { type: 'String', required: true },
    detail: { type: 'String', required: false },
    date: { type: 'String', default : new Date().getTime()},
    type:{type:'String',required:false}, // generic , assigned
    from:{type: 'String', required: false},  
    to:{type: 'String', required: false},  
   read:{type:'Array' ,default:[]},
   ack : {type:'Boolean',default:false}

});
module.exports = mongoose.model('notifications',NotificationSchema);