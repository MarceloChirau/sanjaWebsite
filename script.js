const navMenu=document.querySelector('.menu-is-closed');
const hamburgerBtn=document.querySelector('.hamburder-btn');
// const body=document.querySelector('body');
hamburgerBtn.addEventListener('click',()=>{
   document.body.classList.toggle('nav-open');

    // navMenu.classList.toggle('menu-is-open');

    hamburgerBtn.classList.toggle('open');
})


//for ios

// window.addEventListener('scroll',()=>{
//     const image=document.querySelector(".parallax-image");
//     let scrollPosition=window.scrollY;
//     image.style.transform=`translateY(${scrollPosition*0.3}px)`
// })
  
//another parallax try:
document.addEventListener('DOMContentLoaded',()=>{
    const parallaxElements=document.querySelectorAll('.parallax');

    //define the main scroll function
    function parallaxScroll(){
        const scrollTop=window.scrollY;

        //loop through every parallax elemnt found on the page
        parallaxElements.forEach(element=>{
            //get the parallax speed value and convert it to a number
            const speed=parseFloat(element.getAttribute('data-parallax-speed')||0);
        //calculate the movement distance:
        //scroll distance *parallax speed
        //this creates the slower movement of the background.
        const movement=scrollTop*speed;

        //apply the movement using css transform(translateY)
        //the movement is applied negatively to make the background appear
        //to lag behind the foreground content.
        element.style.transform=`translate3d(0,${movement}px,0)`
    })

    }
//attach the function to the scroll event
//using requestAnimationFrame ensures smoother animations
    let ticking=false;
    window.addEventListener('scroll',()=>{
        if(!ticking){
            window.requestAnimationFrame(()=>{
                parallaxScroll();
                ticking=false;
            })
            ticking=true;
        }
    });
    parallaxScroll();
});