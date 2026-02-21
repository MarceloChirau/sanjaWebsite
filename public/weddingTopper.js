const weddingContainer=document.querySelector('.wedding-container');
const cartImage=document.getElementById('cartImage');
const cartLink=document.querySelector('.cart-link');



document.getElementById('year').textContent=new Date().getFullYear();


document.addEventListener("DOMContentLoaded",async()=>{

    try{

const response=await fetch('/api/v1/weddingTopper/',{
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
    <div class="product-box" data-productid="${item._id}" data-producttype="${item.productType}" data-productimage="${item.image}" >
    <div class="img-box">
    <img src="${item.image}">
    </div>
    <h3 class="h3Type">${item.type}</h3>
    <p class="priceStamp">Size:${item.size}</p>
    <p class="priceStamp">Price:${item.price}€</p>
<button class="stampBtn" >Add to cart</button>
    </div>
    
    `
}).join('')


weddingContainer.insertAdjacentHTML('beforeend',html);

    }
    catch(err){
        console.log(`ERROR:, ${err.message}`)
    }
})

///////////////////////
//event delegation:
weddingContainer.addEventListener('click',async(e)=>{
    const formBussinessInfo=document.querySelector('#formBussinessInfo');
    // console.log('formBussinessInfo:',formBussinessInfo);
    
    
    if(e.target.classList.contains('stampBtn')){
        
const productCard=e.target.closest('.product-box');
const productId=productCard.dataset.productid;
const productType=productCard.dataset.producttype;
const image=productCard.dataset.productimage;
let userId=currentUser

const formData=new FormData();


formData.append('productId',productId);
formData.append('productType',productType);
formData.append('userId',currentUser)
formData.append('image',image);

    const response=await fetch('/api/v1/cart',{
        method:"POST",
        body:formData
    })
    const result=await response.json();
    if(!response.ok){
        alert(`ERROR:${result.message}`)
    }else{
const data=result.data;
console.log('data when we send to cart:',data)
        alert("File is uploaded successfully and product added to the cart!")
        if(data.items.length>0){
            cartImage.classList.add('animate__animated', 'animate__bounce','animate__infinite','animate__slower');
            cartImage.style.backgroundColor='red';
        }

        
    }

}

 })