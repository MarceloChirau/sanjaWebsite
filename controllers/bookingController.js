const Cart=require('../models/cartModel.js');
const Order=require('../models/orderModel.js')
const AppError=require('../utils/AppError.js');
const sendEmail=require('../utils/email.js');

const stripe=require('stripe')(process.env.STRIPE_SECRET);



exports.checkoutSession=async(req,res,next)=>{

    const{userId}=req.params;
    console.log('userId:',userId);
if(!userId)return next(new AppError('Couldnt find the userId'),400)
    const cart=await Cart.findOne({userId});
if(!cart)return next(new AppError('There is nothing in the cart, please go for shopping'),400)

console.log('my cart:',cart)

const needsFile = cart.items.some(item => item.type === 'Štambilj automat' && !item.bussinessFile);

if (needsFile) {
    return next(new AppError('One or more items require business info upload before checkout.', 400));
}

const domain=process.env.NODE_ENV==='development'
? 'https://aryan-interlaboratory-junita.ngrok-free.dev'
: `${req.protocol}://${req.get('host')}`;

const lineItems=cart.items.map(item=>{
    const fullImageUrl = `${domain}${item.image.replace(/^\//,'')}`

/*
item.image.startsWith('http') 
    ? item.image 
    : `${req.protocol}://${req.get('host')}${item.image.startsWith('/') ? '' : '/'}${item.image}`;

*/

    return{
    price_data:{
    currency:'eur',
product_data:{
name:item.type,
description:item.description,
images:[fullImageUrl],//to make sure this is a full url

},
unit_amount:Math.round(item.price*100),

    },
    quantity:item.quantity
    
    
    }
    
    
})


//here i will create my stripe session:
const session=await stripe.checkout.sessions.create({
    client_reference_id:userId,
    currency:'eur',
shipping_address_collection:{
    allowed_countries:['HR'],
},
shipping_options:[{
    shipping_rate_data:{
        type:'fixed_amount',
        fixed_amount:{
            amount:200,
            currency:'eur',
        },
        display_name:'Standard Delivery Fee',
        delivery_estimate:{
            minimum:{
                unit:'business_day',
                value:2,
            },
            maximum:{
                unit:'business_day',
                value:5,
            },
        },
    },
},],
phone_number_collection:{
    enabled:true,
},
name_collection:{
    business:{
        enabled:true,
        optional:true,
    },
},
line_items:lineItems,
payment_method_types:['card'],
mode:"payment",
success_url:`${req.protocol}://${req.get('host')}/success.html?session_id={CHECKOUT_SESSION_ID}`,
cancel_url:`${req.protocol}://${req.get('host')}/cart.html`
})

res.status(200).json({
    status:'success',
    session
})


}

exports.webhookCheckout=async(req,res,next)=>{
    //This function listens for the checkout.session.completed event,
    // finds the userId (which we stored in client_reference_id), and empties the cart.
    //also calls twice the sendEmail function,1 to notify the owner and 2 to notify the custumer
    const signature=req.headers['stripe-signature'];
    let event;
    try{
event=stripe.webhooks.constructEvent(
    req.body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
)


    }catch(err){
return res.status(400).send(`Webhook error:${err.message}`)
    }
if(event.type==='checkout.session.completed'){
    console.log('Step 1: Payment Success Received');
    const session=event.data.object;
    const userId=session.client_reference_id;
console.log('this is the session object:',session)

    //we find the cart
const cart=await Cart.findOne({userId});
console.log('This is the CART:',cart);

const newOrder=await Order.create({
    userId:session.client_reference_id,
    orderNumber:session.id,
        customerName: session.collected_information.shipping_details.name,
        customerPhone:session.customer_details.phone,
        email: session.customer_details?.email || 'No email provided',
        shippingAddress: session.collected_information.shipping_details?.address || {},
        items: cart.items, // This has the bussinessFile paths!
        totalAmount: session.amount_total / 100
})
console.log('this is the newOrder:',newOrder);


const itemsList=cart.items.map(item=>`
  <li>
  <strong>${item.type}</strong> (Quantity:${item.quantity})<br>
  ${item.bussinessFile
     ? `<a href="${process.env.DOMAIN_URL}${item.bussinessFile}">View Bussiness Info Image</a>`
     : 'No file needed'}  
    </li>
    `).join('');

    const adminEmailHtml=`
    <h1>New Order: ${newOrder.orderNumber}</h1>
    <p><strong>Customer:</strong>${newOrder.customerName} (${newOrder.email})</p>
    <p><strong>Phone:</strong>${newOrder.customerPhone}</p>
    <p><strong>Shipping Info</strong><br>
    Country: ${newOrder.shippingAddress?.country || ''},<br>
    City: ${newOrder.shippingAddress?.city || 'N/A'},<br>
    Postal Code: ${newOrder.shippingAddress?.postal_code || ''}</p>

    <ul>${itemsList}</ul>
    <p><strong>Total Paid:</strong> €${newOrder.totalAmount}</p>
    `



//here we will use function that triggers the notification we need:
//this is for my own notification:

console.log('Step 2: Sending Admin Email...');
try{

    await sendEmail({
        email:'marcelodev89@gmail.com',
        subject:`New Order Received ${newOrder.orderNumber}`,
        html:adminEmailHtml
    });
}catch(err){
    console.log(`EMAIL ERROR:`,err)
}




// and this is for the customer notification:
// B. Notification for the CUSTOMER
console.log('Step 2: Sending Customer Email...');
try{
    //https://aryan-interlaboratory-junita.ngrok-free.dev/images/brand/logoPng.png
const logoUrl=`${process.env.DOMAIN_URL}/images/brand/logoPng.png`;
    await sendEmail({
        email: newOrder.email,
        subject: 'Hvala na kupnji! Vaša narudžba je primljena.',
        html: `<!DOCTYPE html>
        <html>
        <head>
        <style>
        @font-face{
  font-family: 'champagne';
  src:url("fontChampagne/ChampagneLimousines.ttf");
  font-weight:normal;
}
  </style>
  </head>
  <body style="margin:0; padding:0;background-color:#E7BFC0;">
            <div style="font-family: 'champagne','Trebuchet MS', Helvetica, Arial, sans-serif;
             padding: 20px;
              border: 1px solid #eee;">
<div>
<img src="${logoUrl}"        
alt="Logo"
width="150"
style="display:block; border:0;"
>
</div>

                <h2 style="color:#5D100A" >Hvala, ${session.customer_details.name}!</h2>
                <p style="color:#A3485A" >Primili smo vašu narudžbu <strong>${newOrder.orderNumber}</strong>.</p>
                <p style="color:#A3485A">Naš tim će sada pregledati vaše podatke i krenuti u izradu vašeg štambilja.</p>
                <hr style="color:#5D100A">
                <p style="color:#5D100A" >Ukupno plaćeno: €${session.amount_total / 100}</p>
            </div>
        `
    });
}catch(err){
    console.log('ERROR EMAIL FOR CUSTUMER:',err)
}
console.log('Email sent to customer!')


//here will empty the cart after successful payment
await Cart.findOneAndDelete({userId});
console.log(`Payment successful.Cart emptied`)

}
    
res.status(200).json({received:true})
}
exports.getSessionDetail = async (req, res) => {
    try {
        //we get the sessionId from frontend=>success.js with takes it as an answer attached in url
        const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
        res.status(200).json({
            status: 'success',
            session
        });
    } catch (err) {
        res.status(404).json({ status: 'fail', message: err.message });
    }
};