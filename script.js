const navMenu=document.querySelector('.menu-is-closed');
const hamburgerBtn=document.querySelector('.hamburder-btn');



hamburgerBtn.addEventListener('click',()=>{
   document.body.classList.toggle('nav-open');


    hamburgerBtn.classList.toggle('open');
})


/*
 <h2 id="h2Title">Toperi</h2>
        <p id="p1">za torte</p>
        <p id="p2">od 5€</p>
        */

const h2Title=document.getElementById("h2Title");
const p1=document.getElementById('p1');
const p2=document.getElementById('p2');
const imgSlide=document.getElementById('imgSlide');

setTimeout(()=>{
h2Title.textContent='Toperi';
  
  h2Title.classList.add('slideFromAbove');
},1000);

setTimeout(()=>{
    p1.textContent='za torte';
    p1.classList.add('slideFromLeft');
},2000);

setTimeout(()=>{
   p2.textContent='od 5€';
   p2.classList.add('slideFromLeft');

    
},3000);


setTimeout(()=>{
    h2Title.textContent='';
    p1.textContent='';
    p2.textContent='';
    
    h2Title.classList.remove('slideFromAbove');
    p1.classList.remove('slideFromLeft');
    p2.classList.remove('slideFromLeft');

imgSlide.src='images/key2.png';


},3500);


setTimeout(()=>{
h2Title.textContent='Kluce';
h2Title.classList.add('slideFromAbove');
    


},4000)

setTimeout(()=>{
    p1.textContent='za svaki';
    p1.classList.add('slideFromLeft');
        
    
    
    },5000);

    setTimeout(()=>{
        p2.textContent='vrata';
        p2.classList.add('slideFromLeft');
            
        
        
        },6000);