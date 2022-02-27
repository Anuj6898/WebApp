const btnhamburger=document.querySelector('#btnHamburger');
const body=document.querySelector('body');
const header=document.querySelector('.header');
const overlay=document.querySelector('#overlayid');
const headerMob=document.querySelector('.header_mob');



btnhamburger.addEventListener('click',function(){
console.log('open btnHamburger');
if(btnhamburger.classList.contains('open')){//close karnege tab
    btnhamburger.classList.remove('open');
    btnhamburger.classList.remove('overlay_open');
    //overlay.classList.remove('overlay');
    //overlay.classList.add('fade');
    headerMob.classList.add('fade');
    headerMob.classList.remove('fade_ani');
    body.classList.remove('noscroll');
}
else{//open karenge tab
    btnhamburger.classList.add('open');
   // overlay.classList.add('overlay');
    //btnhamburger.classList.add('overlay_open');
    //overlay.classList.remove('fade');
    headerMob.classList.remove('fade');
    headerMob.classList.add('fade_ani');
    body.classList.add('noscroll');
}
});
btnhamburger.addEventListener('click',() => {
    overlay.classList.toggle("overlay_open");
});