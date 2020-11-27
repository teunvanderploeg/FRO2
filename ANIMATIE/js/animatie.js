// click on animeer-knop
document.querySelector('.animeer-knop').addEventListener('click', (e) =>{
    document.querySelector('.vlakje').classList.toggle('vlakje-naar-rechts');
})


// na bepaalde tijd komt vlakje weer terug
setTimeout(()=>{
    document.querySelector('.vlakje').classList.toggle('vlakje-naar-rechts');
}, 2000)