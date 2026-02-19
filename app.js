const express=require('express');
const app=express();
const path=require('path');
const globalErrorHandler=require('./middlewares/errorMiddleware.js');
const bookingRoutes=require('./routes/bookingRoutes.js');
const bookingController=require('./controllers/bookingController');

app.post('/webhook-checkout',
    express.raw({type:'application/json'}),
    bookingController.webhookCheckout
);

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))
const stampRouter=require('./routes/stampRoutes.js')
const cartRouter=require('./routes/cartRoutes.js')



app.use('/api/v1/stamps',stampRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v1/booking',bookingRoutes)

















app.use(globalErrorHandler);

module.exports=app;