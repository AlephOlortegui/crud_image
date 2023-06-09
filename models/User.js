const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
}, {timestamps: true})


const User = mongoose.model('User', userSchema)

module.exports = User