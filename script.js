const navMenu=document.querySelector('.menu-is-closed');
const hamburgerBtn=document.querySelector('.hamburder-btn');
const body=document.querySelector('body');
hamburgerBtn.addEventListener('click',()=>{
    body.classList.toggle('nav-open');

    navMenu.classList.toggle('menu-is-open');

    hamburgerBtn.classList.toggle('open');
})