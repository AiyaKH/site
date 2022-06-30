document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector('.page').classList.add('invisible')
    setTimeout(()=>{
        document.querySelector('.page').classList.remove('invisible')
    }, 500)

});
