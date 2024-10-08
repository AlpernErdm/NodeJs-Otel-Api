const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    city:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
},{timestamps:true})


module.exports=mongoose.model('User',userSchema)