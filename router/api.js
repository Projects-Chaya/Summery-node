const router = require('express').Router();
//User
const { createUser,loginUser,updateUser } = require('../controller/user')
//Weather
const {getWeather,createWeather,getWeathersByUserId,deleteWeather}=require('../controller/weather')
//Admin
const {createAdmin,deleteUser,updateAdmin,loginAdmin,getAllUser}=require('../controller/admin');

//User
router.post('/createUser', createUser);
router.get('/loginUser/:id',loginUser);
router.patch('/updateUser/:id',updateUser)

//Weather
router.get('/getWeather',getWeather);
router.post('/createWeather',createWeather);
router.get('/getWeathersByUserId/:id',getWeathersByUserId)
router.delete('/deleteWeather/:id',deleteWeather);

//Admin
router.post('/createAdmin',createAdmin)
router.get('/loginAdmin/:id',loginAdmin)
router.delete('/deleteUser/:adminId/:userId',deleteUser)
router.patch('/updateAdmin/:id',updateAdmin)
router.get('/getAllUser/:id',getAllUser);

module.exports = router