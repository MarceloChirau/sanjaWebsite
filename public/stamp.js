const stampsContainer=document.querySelector('.stamps-container');
const cartImage=document.getElementById('cartImage');
const cartLink=document.querySelector('.cart-link');



document.getElementById('year').textContent=new Date().getFullYear();


document.addEventListener("DOMContentLoaded",async()=>{
    try{

const response=await fetch('/api/v1/stamps/',{
    method:'GET',
    headers:{"Content-Type":"application/json"}
}
)

const result=await response.json();
if(!response.ok){
    alert(`ERROR:${result.message}`)
}
const data=result.data;

// console.log('DATA:',data);
const regex=/(\w+\:)/g;
const html=data.map(item=>{
    return`
    <div class="product-box" data-productid="${item._id}" data-producttype="${item.productType}" >
    <div class="img-box">
    <img src="${item.image}">
    </div>
    <h3 class="h3Type">${item.type}</h3>
    <p class="stampDescription">${item.description}</p>
    <ul class="unorganisedList">
${item.advantages.map(advantage=>
    `<li class="advantageList">${advantage.replace(regex,match=>`<strong>${match}</strong>`)}</li>`
).join('')}
    </ul>

    <p class="priceStamp">Price:${item.price}€</p>
    <button class="stampBtn">Add to cart</button>
    </div>
    
    `
}).join('')


stampsContainer.insertAdjacentHTML('beforeend',html)

    }
    catch(err){
        console.log(`ERROR:, ${err.message}`)
    }
})

///////////////////////
//event delegation:
stampsContainer.addEventListener('click',async(e)=>{
if(e.target.classList.contains('stampBtn')){
    // console.log(e.target.contains('stampBtn'))
    const productCard=e.target.closest('.product-box');
    const productId=productCard.dataset.productid;
    const productType=productCard.dataset.producttype;
    // const userId=localStorage.getItem('userId');
let userId;
    // console.log('userId:',userId);

    console.log("productCard",productCard);



    const response=await fetch('/api/v1/cart',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({productId,productType,userId:currentUser})
    })

const result=await response.json();
if(!response.ok){
    alert(`ERROR: ${result.message}`)
}else{
    const data=result.data;
    console.log('data:',data)
if(data.items.length>0){
    cartImage.classList.add('animate__animated', 'animate__bounce','animate__infinite','animate__slower');
    cartImage.style.backgroundColor='red';
}


    alert(`Product added to cart!`)
}

}
})