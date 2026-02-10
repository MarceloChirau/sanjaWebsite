const express=require('express');
const router=express.Router();
const {showAllStamps,createAllStamps}=require('../controllers/stampController')


router
.route('/')
.get(showAllStamps)
.post(createAllStamps)








module.exports=router;