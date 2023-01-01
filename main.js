let tabsBtn = document.querySelectorAll('btn__item');
let tabsItem = document.querySelectorAll('tabs-item');

document.querySelectorAll('.btn__item').forEach(function(tabsBtn){
  tabsBtn.addEventListener('click', function(e){
  const path = e.currentTarget.dataset.path;

  document.querySelectorAll('.btn__item').forEach(function(btn){ btn.classList.remove('btn__item--active')});
  e.currentTarget.classList.add('btn__item--active');

  document.querySelectorAll('.tabs-item').forEach(function(tabsBtn){
    tabsBtn.classList.remove('tabs-item--active')});

    document.querySelector(`[data-target="${path}"]`).classList.add('tabs-item--active');
    });
  });


const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  loop: true,

  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
},

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
},

autoplay: {
  delay: 5000,
  disableOnInteraction: false,
},

  speed:1000,

  simulateTouch: true,

  touchRatio: 1,

  touchAngle:45,

  grabCursor: true,

 });

 new Accordion('.accordion-list', {
    elementClass: 'accordion',
    triggerClass: 'accordion__control',
    panelClass: 'accordion__content',
    activeClass: 'accordion--active',
 });

 let burger = document.querySelector('.burger');
 let menu = document.querySelector('.header__nav');
 let menuLinks = document.querySelectorAll('.nav__link')

 burger.addEventListener('click',

 function() {

  burger.classList.toggle('burger--active');

  menu.classList.toggle('header__nav--active');

  document.body.classList.toggle('stop-scroll');

 })

 menuLinks.forEach(function(el){
  el.addEventListener('click', function(){

    burger.classList.remove('burger--active');

    menu.classList.remove('header__nav--active');

    document.body.classList.remove('stop-scroll');

  })
 })

 let header = document.querySelector('.header__container');
 let searchForm = document.querySelector('.searchform');
 let search = document.querySelector('.nav__btn');
 let closeBtn = document.querySelector('.formclose__btn');

 search.addEventListener('click',

 function() {

  header.classList.toggle('searchform--active');

 })

 closeBtn.addEventListener('click', function(e){

      e.preventDefault()

      header.classList.remove('searchform--active');

    })



