const mongoose = require('mongoose')

const auth_schema = new mongoose.Schema({
    userid: {
        type: Number,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type:String
    },
    sex: {
        type:String
    },
    blood_group: {
        type:String
    },
    address: {
        type:String
    },
    city: {
        type:String
    },
    state: {
        type:String
    },
    student_phone: {
        type:Number
    },
    pincode: {
        type:Number
    },
    father_phone: {
        type:Number
    },
    mother_phone: {
        type:Number
    },
    father_name: {
        type:String
    },
    mother_name: {
        type:String
    },
    email: {
        type:String
    },
    DOB: {
        type:Date
    },
    attendance: {
        type: Object
    }
})
const auth_Model = mongoose.model('users', auth_schema)
module.exports = auth_Model;