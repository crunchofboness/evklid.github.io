console.log("main.js loaded");
console.log("contactForm:", document.getElementById("contactForm"));

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

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    name: document.getElementById("formName").value.trim(),
    email: document.getElementById("formEmail").value.trim(),
    social: document.getElementById("formSocial").value.trim(),
    message: document.getElementById("formMessage").value.trim(),
  };

  const res = await fetch("/.netlify/functions/sendTelegram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (data.ok) {
    alert("Отправлено ✅");
    e.target.reset();
  } else {
    alert("Ошибка: " + (data.error || "неизвестно"));
  }
});

