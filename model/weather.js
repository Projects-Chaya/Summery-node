const mongoose=require('mongoose')

const weatherScema = mongoose.Schema({

    date:{
        type:Date,
        defualt:new Date()
    },
    city:{
        type:String,
        require:true
    },
    main:{
        temp:Number,
        feels_like:Number,
        temp_min:Number,
        temp_max:Number,
        pressure:Number,
        humidity:Number
    },
    wind:{
        speed:Number,
        deg:Number
    },
    users:[{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }]
})

module.exports=mongoose.model('Weather',weatherScema)
