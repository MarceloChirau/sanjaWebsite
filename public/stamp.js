const stampsContainer=document.querySelector('.stamps-container');
document.getElementById('year').textContent=new Date().getFullYear();

console.log(stampsContainer);
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

console.log('DATA:',data);
const html=data.map(stamp=>{
    return`
    <div class="product-box">
    <div class="img-box">
    <img src="${stamp.image}">
    </div>
    <h3 class="h3Type">${stamp.type}</h3>
    <p class="stampDescription">${stamp.description}</p>
    <ul>
${stamp.advantages.map(advantage=>
    `<li class="advantageList">${advantage}</li>`
).join('')}
    </ul>

    <p class="priceStamp">Price:${stamp.price}€</p>
    </div>
    
    `
}).join('')


stampsContainer.insertAdjacentHTML('beforeend',html)

    }
    catch(err){
        console.log(`ERROR:, ${err.message}`)
    }
})