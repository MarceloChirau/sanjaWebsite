const express=require('express');
const router=express.Router();
const {showAllWeddingToppers,createAllWeddingToppers}=require('../controllers/weddingController.js')


router
.route('/')
.get(showAllWeddingToppers)
.post(createAllWeddingToppers)








module.exports=router;