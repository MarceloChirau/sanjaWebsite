const express=require('express');
const router=express.Router();
const {createCart,showCart,updateCart,removeProductFromCart}=require('../controllers/cartController');
const upload=require('../middlewares/upload')


router
.route('/')
.post((req,res,next)=>{
    upload.single('bussinessInfo')(req,res,(err)=>{
        if(err)return next(err);
        next();
            
    });
},createCart)
.get(showCart)
.patch(updateCart)
.delete(removeProductFromCart)








module.exports=router;