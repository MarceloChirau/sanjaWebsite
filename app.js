const express=require('express');
const app=express();
const path=require('path');
const globalErrorHandler=require('./middlewares/errorMiddleware.js')

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))
const stampRouter=require('./routes/stampRoutes.js')
const cartRouter=require('./routes/cartRoutes.js')



app.use('/api/v1/stamps',stampRouter)
app.use('/api/v1/cart',cartRouter)
















app.use(globalErrorHandler);

module.exports=app;