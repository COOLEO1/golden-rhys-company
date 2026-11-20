const menu=document.querySelector('.menu-btn'),nav=document.querySelector('.nav');
if(menu&&nav){
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
  }));
}
const form=document.getElementById('enquiryForm');
if(form){
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity()) return;
    form.querySelector('.form-feedback').textContent='Thank you. This is a concept preview; the enquiry form will be connected to Pyramids’ preferred contact channel after the business approves the website.';
  });
}
document.getElementById('year').textContent=new Date().getFullYear();