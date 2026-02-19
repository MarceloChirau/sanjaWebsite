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
 ${(item.productType==="stamp" && item.type==="Štambilj automat") ?
         `<form  id="formBussinessInfo" enctype="multipart/form-data"><label class="formLabel">Please upload here your Bussiness ID:</label><input type="file" id="business-file-input" accept=".jpg,.jpeg,.png,.pdf" name="bussinessInfo" required/> </form>` : ""}
    <p class="priceStamp">Price:${item.price}€</p>
<button class="stampBtn" ${(item.productType==="stamp" && item.type==="Štambilj automat") ? "disabled" : ""} >Add to cart</button>
    </div>
    
    `
}).join('')


stampsContainer.insertAdjacentHTML('beforeend',html)

    }
    catch(err){
        console.log(`ERROR:, ${err.message}`)
    }
})
///////////////////////////
//for the add to cart in case is automat stambilj
stampsContainer.addEventListener('change',(e)=>{
    if(e.target.id==='business-file-input'){
        console.log('a file is loaded!')
        const productCard=e.target.closest('.product-box');
        const addBtn=productCard.querySelector('.stampBtn');
        if(e.target.files.length>0){
            addBtn.disabled=false;
        }else{
            addBtn.disabled=true;
        }
    }
})




///////////////////////
//event delegation:
stampsContainer.addEventListener('click',async(e)=>{
    const formBussinessInfo=document.querySelector('#formBussinessInfo');
    // console.log('formBussinessInfo:',formBussinessInfo);
    
    
    if(e.target.classList.contains('stampBtn')){
        
const productCard=e.target.closest('.product-box');
const productId=productCard.dataset.productid;
const productType=productCard.dataset.producttype;
const inputFile=productCard.querySelector('#business-file-input');
let userId=currentUser

const formData=new FormData();

// If the input exists but has no file (extra safety check)
if (inputFile && inputFile.files[0]) {
    formData.append('bussinessInfo',inputFile.files[0]);
    console.log('the file that we send to backend to save is:',inputFile.files[0]);

}


formData.append('productId',productId);
formData.append('productType',productType);
formData.append('userId',currentUser)

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