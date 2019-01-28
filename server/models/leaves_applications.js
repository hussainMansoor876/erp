const mongoose = require('mongoose');

const LeavesSchema = new mongoose.Schema({
    employee_id: {
        type: String
    },
    employee_name: {
        type: String
    },
    dept: {
        type: String
    },
    designation: {
        type: String
    },
    title: {
        type: String
    },
    detail: {
        type: String
    },
    dates: {
        type: String
    },
    days: {
        type: Number
    },
    sl: {
        type: Boolean
    },
    cl: {
        type: Boolean
    },
    read: {
        type: Boolean,
        default: false
    },
    file: {
        type: String
    },
    action_by: {
        type: String
    }, // Person who approved or rejected a request
    status: {
        type: Number,
        default: 0
    }, // 0-> applied , 1->approved , -1->rejected
    active: {
        type: Boolean,
        default: true
    }
});
module.exports = mongoose.model('leaves_applications', LeavesSchema);