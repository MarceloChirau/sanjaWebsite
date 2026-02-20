const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    orderNumber:{type:String,unique:true},
    customerName:String,
    customerPhone:String,
    email:String,
    shippingAddress:Object,
    items:[{
        type:String,
        quantity:Number,
        price:Number,
        bussinessFile:String,//the path to uploaded image
        description:String
    }],
    totalAmount:Number,
    paymentStatus:{type:String,default:'paid'},
    createdAt:{type:Date,default:Date.now()}
});

const Order=mongoose.model("Order",orderSchema);
module.exports=Order;