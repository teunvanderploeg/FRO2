// click on animeer-knop
document.querySelector('.animeer-knop').addEventListener('click', (e) =>{
    document.querySelector('.vlakje').classList.toggle('vlakje-naar-rechts');
})


// na bepaalde tijd komt vlakje weer terug
setTimeout(()=>{
    document.querySelector('.vlakje').classList.toggle('vlakje-naar-rechts');
}, 2000);

// menu klik nav__knop

const menuKnop = document.querySelector('.nav__knop');
const navItems = document.querySelectorAll('.nav__link');

menuKnop.addEventListener('click', ()=>{
    navItems.forEach((item,index) => {
        setTimeout(()=>{
            item.classList.toggle('nav__link--schuif-in');
        }, 50 * index);
    });
    document.querySelector('.fa-bars').classList.toggle('verberg');
    document.querySelector('.fa-times').classList.toggle('verberg');
});