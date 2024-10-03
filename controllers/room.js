const Hotel=require("../models/Hotel")
const Room=require('../models/Room')

const createdRoom =async(req,res,next)=>{
    const hotelId=req.params.hotelId
    try {
        const room=await Room.create(req.body);
        await Hotel.findByIdAndUpdate(hotelId,{$push : {rooms:room._id}})
        res.status(201).json(room)
    } catch (error) {
        res.send(400).json({message:error})
    }
}

const updateddRoom =async(req,res,next)=>{
    try {
        const room=await Room.findByIdAndUpdate(req.params.id,{$set : req.body},{new :true})
        res.status(200).json(room)
    } catch (error) {
        res.send(400).json({message:error})
    }
}

const deletedRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelId
    try {
        await Room.findByIdAndDelete(req.params.id)

        await Hotel.findByIdAndUpdate(hotelId,{$pull : {rooms:req.params.id}})
        res.send(201).json("Room has deleted ...")
    } catch (error) {
        res.send(404)
    }
}

const getDetailRoom =async(req,res,next)=>{
    try {
        const room=await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        res.send(400).json({message:error})
    }
}

const getAllRoom =async(req,res,next)=>{
    try {
        const room=await Room.find()
        res.status(200).json(room)
    } catch (error) {
        res.send(400).json({message:error})
    }
}

module.exports={getAllRoom,getDetailRoom,createdRoom,updateddRoom,deletedRoom}