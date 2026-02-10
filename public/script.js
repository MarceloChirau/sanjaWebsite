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
//year for the copyright:
document.getElementById('year').textContent=new Date().getFullYear();



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
let nextIndex=heroObject[currentIndex];



h2Title.classList.remove(...animations);
p1.classList.remove(...animations);
p2.classList.remove(...animations);

imgSlide.src=nextIndex.src;
h2Title.textContent=nextIndex.h2Title;
p1.textContent=nextIndex.p1;
p2.textContent=nextIndex.p2;

currentIndex=(currentIndex+1)%heroObject.length;

setTimeout(()=>{
    
        h2Title.classList.add(animations[0]);
        p1.classList.add(animations[1]);
        p2.classList.add(animations[1]);
    

   


},0);

}
myHero();
setInterval(myHero,5000);