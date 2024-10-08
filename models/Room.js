const mongoose=require('mongoose')

const roomSchema=mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    maxPeople:{
        type:Number,
        required:true
    },
    roomNumbers:[{
        number:Number,
        unvailableDates:{
            type:[Date],
        }
    }]
},{timeStamp:true})

module.exports=mongoose.model('Room',roomSchema)