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
    email: {
        type:String
    }
})
const auth_Model = mongoose.model('users', auth_schema)
module.exports = auth_Model;