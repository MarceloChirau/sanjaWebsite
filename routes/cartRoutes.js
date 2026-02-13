const express=require('express');
const router=express.Router();
const {createCart,showCart,updateCart,removeProductFromCart}=require('../controllers/cartController')


router
.route('/')
.post(createCart)
.get(showCart)
.patch(updateCart)
.delete(removeProductFromCart)








module.exports=router;