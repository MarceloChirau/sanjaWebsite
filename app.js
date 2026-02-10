const express=require('express');
const app=express();
const path=require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))
const stampRouter=require('./routes/stampRoutes.js')


app.use('/api/v1/stamps',stampRouter)

















module.exports=app;