document.getElementById('_hart_').addEventListener('click', N_Red);

function N_Red(){
    gsap.to('h1', { duration: 2, x: '3em', ease: 'power'});
    gsap.to('h1', {delay:2.5 , duration: 2, x: '0em', ease: 'power'});
}

gsap.from('h1', { duration: 1, y: '-2em', ease: 'bounce'});
gsap.from('h1', { duration: 1, x: '-20em', ease: 'power'});