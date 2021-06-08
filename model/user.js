const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userScema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: Number,
        minlength: 6,
        maxlength: 6,
        require: true
    },
    email: {
        type: String,
        //check invalide email
        validate: {
            validator: (e) => {
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e);
            },
            message: props => ` error: ${props.value} is not valid!`
        }
    },
    adminId: {
        type: mongoose.Types.ObjectId,
        ref: 'Admin'
    },
    wathers: [{
        type: mongoose.Types.ObjectId,
        ref: 'Weather'
    }]
})
//create jwt in create a new user and print in console
userScema.post('save', (thisUser) => {
    let thisUserId = thisUser._id
    const jwtId = jwt.sign({ thisUserId }, process.env.SECREET)
    console.log(jwtId);
    console.log(thisUser._id);
    return;
})

module.exports = mongoose.model('User', userScema)