const {typeByCount,createdHotel,updatedHotel,deletedHotel,getByIdHotel,getAllHotel}=require('../controllers/hotel')

const express=required('express')
const router=express.Router();

router.get('/getAllHotel',getAllHotel)
router.get('/typeByCount',typeByCount)
router.get('/getByIdHotel/:id',getByIdHotel)
router.post('/createdHotel',createdHotel)
router.put('/updatedHotel/:id',updatedHotel)
router.delete('deletedHotel/:id',deletedHotel)



module.exports=router