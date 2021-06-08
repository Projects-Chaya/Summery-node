const request = require('request')
const Weather = require('../model/weather')
const User = require('../model/user')

const requestApi = (city) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_WEATHER}`
        }
        request(options, function (err, res, body) {
            if (err) {
                reject(err)
            }
            else
                resolve(body)
        });
    })
}
const getWeather = (req, res) => {
    requestApi(req.body.city).then(data => {
        console.log(data);
        const resolve = JSON.parse(data)
        res.status(200).json({ wind: resolve.wind })
    }).catch(err => {
        res.status(404).send(err)
    })
}
const createWeather = async (req, res) => {
    try {
        const newWeather = new Weather(req.body);
        const w = await newWeather.save();
        await User.updateMany({ _id: req.body.users}, { $push: { 'wathers': w._id } })
        console.log({ weather: w });
        res.status(201).json({ weather: w })
    } catch (error) {
        res.status(500).send(error)
    }
    //status(201) created successful
    //status(500) general error
}
const getWeathersByUserId = async (req, res) => {
    try {
        const weatherOfUsers = await User.findById(req.params.id)
            .populate({ path: 'wathers', select: 'city wind' })
        res.status(200).json(weatherOfUsers)
    } catch (error) {
        res.send(error)
    }
}
const deleteWeather = async (req, res) => {
    try {
        const weatherDelete = await Weather.findById(req.params.id);
        const user = await User.findByIdAndUpdate(weatherDelete.users, { $pull: { wathers: weatherDelete._id } });
        await Weather.findByIdAndDelete(req.params.id)
        res.status(200).send('Delete')
    } catch (error) {
        console.log(`Error ${error}`);
    }
}
module.exports = { getWeather, createWeather, getWeathersByUserId, deleteWeather }