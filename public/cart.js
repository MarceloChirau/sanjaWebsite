const cartContainer=document.querySelector('.cart-container');
const totalAmount=document.querySelector('#totalAmount');
const totalProducts=document.querySelector('#totalProducts');
const totals=document.querySelector('.totals');

const checkout=`
<button class="checkoutBtn">Checkout</button>

`

// const userId=localStorage.getItem('userId');
console.log('window.location:',window.location.href)

document.addEventListener("DOMContentLoaded",async()=>{
const response=await fetch(`/api/v1/cart?userId=${currentUser}`,{
    method:"GET",
    headers:{'Content-Type':'application/json'}

})

const result=await response.json();

if(!response.ok || !result.data || result.data.items.length===0){
const html=`
<div class="cartIsEmptyContainer">
<h1>Your Cart is Emtpy</h1>
<h2>You can go back to shopping</h2>
</div>
`
cartContainer.innerHTML=html;
totals.style.display='none';
// return cartContainer.insertAdjacentHTML('beforeend',html);
return;

}else{
    const data=result.data;
    // console.log('Data:',data);
    const items=data.items;
    // console.log('Object.keys(items[0]):',Object.keys(items[0]));
    // if(items){

    //     const bussinessFile=Object.keys(items[0]).includes('bussinessFile');
    // }
    // console.log('bussinessFile:',bussinessFile);
//if there is some producta in the cart
if(items.length>0){
    const regex=/(\w+\:)/g;

    const html=items.map(item=>{
        return `
          <div class="product-box" data-productid="${item.productId}" data-producttype="${item.productType}" >
    <div class="img-box">
    <img src="${item.image}">
    </div>
    <h3 class="h3Type"><strong>${item.type}</strong></h3>
    <p class="stampDescription">${item.description}</p>
    <ul class="unorganisedList">
${item.advantages.map(advantage=>
    `<li class="advantageList">${advantage.replace(regex,match=>`<strong class="strongLists">${match}</strong>`)}</li>`
).join('')}
    </ul>
   
<p id='pQuantity'><strong>Quantity:</strong><span class='quantity'>${item.quantity}</span></p>
    <p class="priceStamp">Price:${item.price}€</p>
    ${item.bussinessFile ? ` <p class="priceStamp">Your Bussiness Info:</p><div class="img-box"><img src="${item.bussinessFile}"></div>` : ""}
    <button class="AddBtn">Add more</button>
    <button class="ReduceBtn">Reduce</button>
    <button class="RemoveBtn">Remove</button>



    </div>
    
    `
}).join('')
        
// cartContainer.insertAdjacentHTML('beforeend',html);

cartContainer.innerHTML=html;
totalProducts.innerText=`${data.totalProducts}`
totalAmount.innerText=`${data.totalAmount.toFixed(2)}€`;
tot
totals.insertAdjacentHTML('beforeend',checkout);
totals.style.display='block';
if(!document.querySelector('.checkoutBtn')) totals.insertAdjacentHTML('beforeend', checkout);
}

}

})
///////////////////////

if(cartContainer){// i did this beacuse when gallery is loading it throw an error


    cartContainer.addEventListener('click',async(e)=>{
    
    
     ////////////////////////////////////////////////////////////   
        if(e.target.classList.contains('AddBtn')){
            //userId,productId,productType
            const productCard=e.target.closest('.product-box');
            const productId=productCard.dataset.productid;
            const productType=productCard.dataset.producttype;
            const quantity=productCard.querySelector('.quantity')
            console.log('userId…',currentUser)
    
    const response=await fetch('/api/v1/cart',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({productId,productType,userId:currentUser})
    })
    
    const result=await response.json();
    if(!response.ok)alert(`ERROR:${result.message}`)
    
        const data=result.data;
        console.log('data:',data);
        const items=data.items;
        const existingItemIndex=items.findIndex(item=>item.productId===productId)
    
        if(existingItemIndex>-1){
           quantity.innerText= `${items[existingItemIndex].quantity}`;
        }
    
        totalProducts.innerText=`Number of Products:${data.totalProducts}`
    totalAmount.innerText=`Total Amount:${data.totalAmount.toFixed(2)}`;
        }else if(e.target.classList.contains('ReduceBtn')){
    
            const productCard=e.target.closest('.product-box');
            const productId=productCard.dataset.productid;
            const productType=productCard.dataset.producttype;
            const quantity=productCard.querySelector('.quantity');
    
            const response=await fetch('/api/v1/cart',{
                method:'PATCH',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({userId:currentUser,productId})
            })
            const result=await response.json();
    if(!response.ok){
        alert(`ERROR:${result.message}`)
    }
    const data=result.data;
        console.log('data:',data);
        const items=data.items;
        const existingItemIndex=items.findIndex(item=>item.productId===productId)
    
        if(existingItemIndex>-1){
           quantity.innerText= `${items[existingItemIndex].quantity}`;
        }else if(existingItemIndex===-1){
            productCard.remove();
        }
    
        totalProducts.innerText=`${data.totalProducts}`
    totalAmount.innerText=`${data.totalAmount.toFixed(2)}€`;
    
        }else if(e.target.classList.contains('RemoveBtn')){
    ///////////////////////////////////////////
    const productCard=e.target.closest('.product-box');
            const productId=productCard.dataset.productid;
            const productType=productCard.dataset.producttype;
            const quantity=productCard.querySelector('.quantity');
    
            const response=await fetch('/api/v1/cart',{
                method:'DELETE',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({userId:currentUser,productId})
            })
            const result=await response.json();
    if(!response.ok){
        alert(`ERROR:${result.message}`)
    }
    const data=result.data;
        console.log('data:',data);
        const items=data.items;
        const existingItemIndex=items.findIndex(item=>item.productId===productId)
    
        if(existingItemIndex===-1){
            productCard.remove()
        }
    
// Inside your click listener, after removing an item:
if (cartContainer.querySelectorAll('.product-box').length === 0) {
    cartContainer.innerHTML = `
        <div class="cartIsEmptyContainer">
            <h1>Your Cart is Empty</h1>
        </div>`;
    totals.style.display = 'none'; // Hide the checkout button and totals
}

        totalProducts.innerText=`${data.totalProducts}`
    totalAmount.innerText=`${data.totalAmount.toFixed(2)}€`;
    
    
    
    
    
    
    //////////////////////////////////////////
        }
    })
    // console.log('currentUser:',currentUser);
    
    
    const userId=currentUser;
    // At the bottom of your code, add a listener to the parent container
    totals.addEventListener('click', async (e) => {
        if (e.target.classList.contains('checkoutBtn')) {
            const response = await fetch(`/api/v1/booking/checkout-session/${userId}`);
            const result = await response.json();
            
            if (!response.ok) return alert(result.message);
            
            // Redirect to Stripe
            window.location.assign(result.session.url);
        }
    });
}