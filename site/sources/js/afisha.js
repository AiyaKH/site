const swiper1 = new Swiper('.first', {
    loop:true
})
const swiper2 = new Swiper('.second', {
    loop:true
})
const swiper3 = new Swiper('.third', {
    loop:true
})

const p1 = document.querySelector('.ar-p-1')
const p2 = document.querySelector('.ar-p-2')
const p3 = document.querySelector('.ar-p-3')

const n1 = document.querySelector('.ar-n-1')
const n2 = document.querySelector('.ar-n-2')
const n3 = document.querySelector('.ar-n-3')

p1.addEventListener('click', ()=>{
    swiper1.slidePrev();
})
p2.addEventListener('click', ()=>{
    swiper2.slidePrev();
})
p3.addEventListener('click', ()=>{
    swiper3.slidePrev();
})

n1.addEventListener('click', ()=>{
    swiper1.slideNext();
})
n2.addEventListener('click', ()=>{
    swiper2.slideNext();
})
n3.addEventListener('click', ()=>{
    swiper3.slideNext();
})
