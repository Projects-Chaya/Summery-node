const User = require('../model/user')
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config();


function sendmail(email, name) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            password: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Register to weather',
        text: `Welcome to ${name}`
    };
    console.log("email " + email);
    console.log("name " + name);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("error....." + error);
        } else {
            console.log(`Email sent: +${info.response}`);
        }
    });
}

const createUser = async (req, res) => {
    const newUser = new User(req.body)
    try {
        const user = await newUser.save();
        sendmail(req.body.email, req.body.name);
        console.log('add user successful');
        res.status(201).json({ user: user })
    } catch (err) {
        console.log(err)
    }
    //status(201) created successful
}

const loginUser = ((req, res) => {
    User.findById({ _id: req.params.id }).then(user => {
        res.status(200).json(user)
    }).catch(err => {
        console.log(`Error: ${err}`);
        res.status(404).send(`Error: ${err}`)
    })
})

const updateUser = ((req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name }, { new: true }).then(user => {
        res.status(200).json(user)
    }).catch(err => {
        console.log(`Error: ${err}`);
        res.status(404).send(`Error: ${err}`)
    })
})
module.exports = { createUser, loginUser, updateUser }