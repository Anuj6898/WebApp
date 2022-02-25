const btnhamburger=document.querySelector('#btnHamburger');
const body=document.querySelector('body');
const header=document.querySelector('.header');
const overlay=document.querySelector('#overlayid');
const headerMob=document.querySelector('.header_mob');



btnhamburger.addEventListener('click',function(){
console.log('open btnHamburger');
if(btnhamburger.classList.contains('open')){//close karnege tab
    btnhamburger.classList.remove('open');
    overlay.classList.remove('overlay');
    overlay.classList.add('fade');
    headerMob.classList.add('fade');
    body.classList.remove('noscroll');
}
else{//open karenge tab
    btnhamburger.classList.add('open');
    overlay.classList.add('overlay');
    overlay.classList.remove('fade');
    headerMob.classList.remove('fade');
    body.classList.add('noscroll');
}
});