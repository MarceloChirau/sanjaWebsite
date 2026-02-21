const mongoose=require('mongoose');

const cartSchema=new mongoose.Schema({
    userId:String,
    items:[
        {
            stamp:{type:mongoose.Schema.Types.ObjectId,ref:'Stamp'},
            cakeTopper:{type:mongoose.Schema.Types.ObjectId,ref:'CakeTopper'},

            productId:{type:String},
            productType:{type:String},
            type:{type:String},
            quantity:{type:Number,default:1},
            image:{type:String},
            description:{type:String},
            advantages:{type:[String]},
            bussinessFile:{type:String},
            price:{type:Number}
        }

    ],
    totalProducts:Number,
    totalAmount:Number
})

const Cart=mongoose.model('Cart',cartSchema);
module.exports=Cart;