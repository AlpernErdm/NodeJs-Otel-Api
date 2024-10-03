
const {getAllRoom,getDetailRoom,createdRoom,updateddRoom,deletedRoom}=require('../controllers/room')

const express=require('express')
var router=express.Router();

router.get('getAllRoom',getAllRoom)
router.get('getDetailRoom',getDetailRoom)
router.post('createdRoom/:id/:hotelid',createdRoom)
router.put('updateddRoom/:id',updateddRoom)
router.delete('deletedRoom/:id',deletedRoom)

module.exports=router