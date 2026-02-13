const Cart=require('../models/cartModel');
const Stamp=require('../models/stampModel');
const Award = require('../models/awardModel');
const CakeTopper = require('../models/cakeTopperModel');

exports.createCart=async(req,res)=>{
try{


    
    //we created the userId once user is navigating our site,productId is the id of the product and producType is to know what type is 
    // productType should be: 'stampId', 'awardId', or 'cakeTopperId'
    const {userId,productId,productType}=req.body;
    
    // console.log('userId:',userId,'productId:',productId,'productType:',productType)

let product;
    switch(productType){
        //if it is a stamp then search for a stamp with the id provided
        case "stamp":
           product=await Stamp.findById({_id:productId});
            break;
            
            //if it is an award then search for a award with the id provided
            case "award":
           product=await Award.findById({_id:productId})
            break;
            
            //if it is a cakeTopper then search for a cakeTopper with the id provided
        case 'cakeTopper':
            product=await CakeTopper.findById({_id:productId})
            break;
            default:
                return res.status(400).json({status:'fail',message:'Invalid product type'})
    }

    //in case there is a mistake and for some reason there is no product not even in the list or categories
if(!product){
    return res.status(404).json({status:'fail',message:'Product not found'})
}
//so here we found the product, and we register the price, we did the whole code above so we arrange the right price
const price=product.price;

//first let's check if there is anything in the cart with this userId
    let cart=await Cart.findOne({userId});
    //if there isnt then we will create one
    if(!cart){
  
        cart=await Cart.create({
            //by using the userId we initially created, and in the items category: we add all the below
            userId,
            items:[

                {    productId,
                    productType,
                    type:product.type,
                    quantity:1,
                    image:product.image,
                    description:product.description,
                    advantages:product.advantages, //might be a problem , i might have to put it in an array
                    price
                }
            ],
            totalProducts:1,
            totalAmount:price
        });
       return res.status(201).json({status:'success',data:cart})
    }else{

        //so here the user already exist and he has some staff in his cart
        // we want to check if he has already a product or not, if yes the existingItemIndex will hold the index of the product 
        //otherwise will hold -1
const existingItemIndex=cart.items.findIndex(item=>{
    console.log(item.productId);
     return  item.productId===productId;
})
console.log('the existingItemIndex is at: ',existingItemIndex)

//if exists in cart already
if(existingItemIndex>-1){
    //then increase the the quantity
    cart.items[existingItemIndex].quantity+=1;
//here i could add a total price of the same products together

}else{
    // cart.items.push({[productType]:productId,quantity:1,price});
    //otherwise add inside the cart everything like i adde in the creation of the cart and adding the first product

    cart.items.push({productId,
        productType,//like stamp,awar or caketopper
        type:product.type,// the type of stamp(model etc)
        quantity:1,
        image:product.image,
        description:product.description,
        advantages:product.advantages,
        price});

}

cart.totalProducts=cart.items.reduce((acc,item)=>acc+item.quantity,0)
cart.totalAmount=cart.items.reduce((acc,item)=>acc+(item.quantity*item.price),0)
    }
 await cart.save();
res.status(200).json({status:'success',data:cart})
}
catch(err){
    console.log('Error adding  product to cart:',err);
    res.status(500).json({
        status:'error',
        message:'Failed to add product to cart.Please try again',
        details:err.message
    })
}

}
exports.showCart=async(req,res)=>{
try{
console.log('req.query:',req.query)
    const {userId}=req.query;
    console.log('userId found!',userId)
    const cart=await Cart.findOne({userId});
    if(!cart)return res.status(404).json({status:'fail',message:'The cart is empty'})
    return res.status(200).json({status:200,data:cart})
}
catch(err){
    res.status(404).json({
        status:'fail',
        message:err.message
    })
}

}
exports.updateCart=async(req,res)=>{
    const{userId,productId}=req.body;
    console.log('userId:',userId,'productId:',productId);
//first lets find the cart and if there is any:

const cart=await Cart.findOne({userId});
//check if there is a cart
if(!cart) return res.status(404).json({status:'fail',message:'There is no cart available'})
//so it exists then
const items=cart.items;
const existingItemIndex=items.findIndex(item=>item.productId===productId)
console.log("existingItemIndex:",existingItemIndex);
if(existingItemIndex>-1){
    if(items[existingItemIndex].quantity>1){

        items[existingItemIndex].quantity-=1;
    }else if(items[existingItemIndex].quantity===1){
        items.splice(existingItemIndex,1)
    }


}
cart.totalProducts=cart.items.reduce((acc,item)=>acc+item.quantity,0)
cart.totalAmount=cart.items.reduce((acc,item)=>acc+(item.quantity*item.price),0)

await cart.save();
res.status(200).json({status:'success',data:cart})

}
exports.removeProductFromCart=async(req,res)=>{
    const{userId,productId}=req.body;
    console.log('userId:',userId,'productId:',productId);
//first lets find the cart and if there is any:

const cart=await Cart.findOne({userId});
//check if there is a cart
if(!cart) return res.status(404).json({status:'fail',message:'There is no cart available'})
//so it exists then
const items=cart.items;
const existingItemIndex=items.findIndex(item=>item.productId===productId)
console.log("existingItemIndex:",existingItemIndex);
if(existingItemIndex>-1){
   items.splice(existingItemIndex,1);


}
cart.totalProducts=cart.items.reduce((acc,item)=>acc+item.quantity,0)
cart.totalAmount=cart.items.reduce((acc,item)=>acc+(item.quantity*item.price),0)

await cart.save();
res.status(200).json({status:'success',data:cart})
}