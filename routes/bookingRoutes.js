const express=require('express');
const router=express.Router();
const {checkoutSession,getSessionDetail}=require('../controllers/bookingController.js')

router
.route('/checkout-session/:userId')
.get(checkoutSession);



router.get('/session-detail/:sessionId', getSessionDetail);








module.exports=router;
