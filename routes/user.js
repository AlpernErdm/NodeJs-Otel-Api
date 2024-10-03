const { deleteUser, getDetailUser, getAllUser, updateUser } = require('../controllers/user');
const express = require('express');
const { verifyAdmin, verifyUser } = require('../middleware/verify');
const router = express.Router();

router.get('/getDetailUser/:id', verifyUser, getDetailUser);
router.get('/getAllUser', verifyAdmin, getAllUser);
router.put('/updateUser/:id', verifyUser, updateUser);
router.delete('/deleteUser/:id', verifyUser, deleteUser);

module.exports = router;
