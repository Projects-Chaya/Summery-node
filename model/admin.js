const mongoose = require('mongoose');


const adminScema = mongoose.Schema({
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
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('Admin', adminScema)