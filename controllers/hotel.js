const Hotel=require("../models/Hotel")
const Room=require("../models/Room")

const createdHotel= async(req,res,next)=>{
    try {
        const hotel=await Hotel.create(req.body);
        res.status(200).json({newHotel})

    } catch (error) {
        res.status(404).json( {message:error})
    }
}

const updatedHotel= async(req,res,next)=>{
    const {id}=req.params
   try {
    const hotel= await Hotel.findByIdAndUpdate(id,{$set :req.body},{new:true});
    res.status(200).json(hotel)
   } catch (error) {
    res.send(404).json({message:error})
   }
}

const deletedHotel= async(req,res,next)=>{
    const {id}=req.params
   try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json({message:"User {$id} has been deleted "})
   } catch (error) {
    res.send(404).json({message:error})
   }   
}

const getByIdHotel= async(req,res,next)=>{
    const {id}=req.params
   try {
   const hotel= await Hotel.findById(id);
    res.status(200).json(hotel)
   } catch (error) {
    res.send(404).json({message:error})
   } 
}
const getAllHotel= async(req,res,next)=>{
    const {min,max,...others}=req.query
   try {
   const hotel= await Hotel.find({
    ...others,
    cheapestPrice:{$gt:min |1,$lt:max|999},
   }).limit(req.query.limit);
    res.status(200).json(hotel)
   } catch (error) {
    res.send(404).json({message:error})
   } 
}

const typeByCount= async(req,res,next)=>{
   try {
    const hotel=await Hotel.countDocuments({type:"hotel"})
    const villa=await Hotel.countDocuments({type:"villa"})
    
    res.status(200).json([
        {type:"hotel",count:hotel},
        {type:"villa",count:villa}])

   } catch (error) {
    res.send(404).json({message:error})
   } 
}

module.exports={typeByCount,createdHotel,updatedHotel,deletedHotel,getByIdHotel,getAllHotel}