const express=require('express');
const app=express();
const path=require('path');
const globalErrorHandler=require('./middlewares/errorMiddleware.js');
const bookingRoutes=require('./routes/bookingRoutes.js');
const bookingController=require('./controllers/bookingController');
const stampRouter=require('./routes/stampRoutes.js')
const cartRouter=require('./routes/cartRoutes.js')
const weddingRouter=require('./routes/weddingRoutes.js')

app.post('/webhook-checkout',
    express.raw({type:'application/json'}),
    bookingController.webhookCheckout
);

app.use(express.json());
//just for ngrok:
app.use((req, res, next) => {
    res.setHeader('ngrok-skip-browser-warning', 'true');
    next();
  });
app.use(express.static(path.join(__dirname,'public')))


app.use('/api/v1/stamps',stampRouter)
app.use('/api/v1/weddingTopper',weddingRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v1/booking',bookingRoutes)

















app.use(globalErrorHandler);

module.exports=app;