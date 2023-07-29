
const { Schema, model } = require('mongoose')

const User = model('User', Schema({

    name: {
        type: String,
        required: [true, 'User name missing']
    },
    email: {
        type: String,
        required: [true, 'Email missing']
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'Password length must be greater than 5'],
        maxLength: 2048
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

}))



module.exports.User = User