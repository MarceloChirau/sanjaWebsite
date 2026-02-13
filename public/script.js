const navMenu=document.querySelector('.menu-is-closed');
const hamburgerBtn=document.querySelector('.hamburder-btn');
const h2Title=document.getElementById("h2Title");
const p1=document.getElementById('p1');
const p2=document.getElementById('p2');
const imgSlide=document.getElementById('imgSlide');
//year for the copyright:
document.getElementById('year').textContent=new Date().getFullYear();



hamburgerBtn.addEventListener('click',()=>{
   document.body.classList.toggle('nav-open');


    hamburgerBtn.classList.toggle('open');
})







const heroObject=[{
    h2Title:'Toperi',
    p1:'za torte',
    p2:'od 5€',
    src:'/images/imagesForHero/carousel2.jpeg'
},
{
    h2Title:'Boceri',
    p1:'za rakja',
    p2:'od 5€',
    src:'/images/imagesForHero/carousel1.jpeg'
},
{
    h2Title:'Etickete',
    p1:'za spomene',
    p2:'od 5€',
    src:'/images/imagesForHero/carousel3.jpeg'
},
{
    h2Title:'Toperi',
    p1:'za torte',
    p2:'od 5€',
    src:'/images/imagesForHero/carousel4.jpeg'
},
{
    h2Title:'Toperi',
    p1:'za torte',
    p2:'od 5€',
    src:'/images/imagesForHero/carousel5.jpeg'
},
{
    h2Title:'Toperi',
    p1:'za torte',
    p2:'od 5€',
    src:'/images/imagesForHero/carousel6.jpeg'
},
{
    h2Title:'Toperi',
    p1:'za torte',
    p2:'od 5€',
    src:'/images/imagesForHero/carousel7.jpeg'
},
{
    h2Title:'Toperi',
    p1:'za torte',
    p2:'od 5€',
    src:'/images/imagesForHero/carousel8.jpeg'
},
{
    h2Title:'Toperi',
    p1:'za torte',
    p2:'od 5€',
    src:'/images/imagesForHero/carousel9.jpeg'
}



]
let animations=['slideFromAbove','slideFromLeft']
let  currentIndex=0;

function myHero(){
if(!heroObject || heroObject.length===0){
    console.error('herioObject is undefined or empty.')
    return ;
}

let nextIndex=heroObject[currentIndex];

if (h2Title) h2Title.classList.remove(...animations);
    if (p1) p1.classList.remove(...animations);
    if (p2) p2.classList.remove(...animations);

    if (imgSlide) imgSlide.src=nextIndex.src;
    if (h2Title) h2Title.textContent=nextIndex.h2Title;
    if (p1) p1.textContent=nextIndex.p1;
    if (p2) p2.textContent=nextIndex.p2;



// h2Title.classList.remove(...animations);
// p1.classList.remove(...animations);
// p2.classList.remove(...animations);

// imgSlide.src=nextIndex.src;
// h2Title.textContent=nextIndex.h2Title;
// p1.textContent=nextIndex.p1;
// p2.textContent=nextIndex.p2;

currentIndex=(currentIndex+1)%heroObject.length;

setTimeout(()=>{
    
      if(h2Title)  h2Title.classList.add(animations[0]);
     if(p1)   p1.classList.add(animations[1]);
      if(p2)  p2.classList.add(animations[1]);
    

   


},0);

}

document.addEventListener('DOMContentLoaded',()=>{

    myHero();
    setInterval(myHero,5000);
})

function getOrCreateUser(){
    let userId=localStorage.getItem('userId');
    if(!userId){
        userId=crypto.randomUUID();
        localStorage.setItem('userId',userId)
    }else{
        console.log(`user found:${userId}`)
    }
    return userId;
}

const currentUser=getOrCreateUser();

// localStorage.removeItem('userId');