const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./router/api')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
dotenv.config();

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log('Connected');
    })
    .catch((err) => {
        console.log(`error: ${err}`);
    })

app.use(bodyParser.json());
//Check login user by jwt
app.use('/', (req, res, next) => {
    if (req.path.includes('/loginUser')&&!req.path.includes('Admin')) {
        try {
            console.log(req.path);
            const idJwt = jwt.verify(req.headers['authorization'], process.env.SECREET)
            next()
        } catch (error) {
            console.log(`Error: ${error}`);
            res.status(401).send(error)
        }
    }
    else{
        next()
    }
})
app.use('/',(err,req,res,next)=>{
    console.log(err.stack);
    res.status(404).send(err.stack)
    next()
})
app.use('/', router);

app.listen(process.env.PORT, (req, res) => {
    console.log('listen port 7000...');
})