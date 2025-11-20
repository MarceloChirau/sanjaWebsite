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

const heroObject=[{
    h2Title:'Toperi',
    p1:'za torte',
    p2:'od 5€',
    src:'imagesForHero/goodCakeTopper.PNG'
},
{
    h2Title:'Boceri',
    p1:'za rakja',
    p2:'od 5€',
    src:'imagesForHero/boca1.jpeg'
},
{
    h2Title:'Etickete',
    p1:'za spomene',
    p2:'od 5€',
    src:'imagesForHero/groblje6.jpeg'
},
{
    h2Title:'Toperi',
    p1:'za torte',
    p2:'od 5€',
    src:'imagesForHero/heski7.png'
},
{
    h2Title:'Toperi',
    p1:'za torte',
    p2:'od 5€',
    src:'imagesForHero/key2.png'
},
{
    h2Title:'Toperi',
    p1:'za torte',
    p2:'od 5€',
    src:'imagesForHero/stamps.png'
},
{
    h2Title:'Toperi',
    p1:'za torte',
    p2:'od 5€',
    src:'imagesForHero/trophy.jpeg'
},
{
    h2Title:'Toperi',
    p1:'za torte',
    p2:'od 5€',
    src:'imagesForHero/woodHeart.jpeg'
},
{
    h2Title:'Toperi',
    p1:'za torte',
    p2:'od 5€',
    src:'imagesForHero/yellowSign.jpeg'
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