document.getElementById('_hart_').addEventListener('click', love_move);

document.getElementById('_aAnders_').addEventListener('mouseover', A1_move);
document.getElementById('_n_').addEventListener('mouseover', N_move);
document.getElementById('_d_').addEventListener('mouseover', D_move);
document.getElementById('_e_').addEventListener('mouseover', E_move);
document.getElementById('_r_').addEventListener('mouseover', R_move);
document.getElementById('_s_').addEventListener('mouseover', S_move);

document.getElementById('_maRechthoek_').addEventListener('click', Rechthoek_move);
document.getElementById('_m_').addEventListener('click', M_move);
document.getElementById('_aMa_').addEventListener('click', A2_move);
document.getElementById('_g_').addEventListener('click', G_move);


function love_move(){
    gsap.to('.love', { duration: 2, x: '4em', ease: 'power'});
    gsap.to('.love', {delay:1.5 , duration: 2, x: '0em', ease: 'power'});
}
function A1_move(){
    gsap.to('.A1', { duration: 2, x: '4em', ease: 'power'});
    gsap.to('.A1', {delay:1.5 , duration: 2, x: '0em', ease: 'power'});
}
function N_move(){
    gsap.to('.N', { duration: 2, x: '4em', ease: 'power'});
    gsap.to('.N', {delay:1.5 , duration: 2, x: '0em', ease: 'power'});
}
function D_move(){
    gsap.to('.D', { duration: 2, x: '4em', ease: 'power'});
    gsap.to('.D', {delay:1.5 , duration: 2, x: '0em', ease: 'power'});
}
function E_move(){
    gsap.to('.E', { duration: 2, x: '4em', ease: 'power'});
    gsap.to('.E', {delay:1.5 , duration: 2, x: '0em', ease: 'power'});
}
function R_move(){
    gsap.to('.R', { duration: 2, x: '4em', ease: 'power'});
    gsap.to('.R', {delay:1.5 , duration: 2, x: '0em', ease: 'power'});
}
function S_move(){
    gsap.to('.S', { duration: 2, x: '4em', ease: 'power'});
    gsap.to('.S', {delay:1.5 , duration: 2, x: '0em', ease: 'power'});
}

function Rechthoek_move(){
    gsap.to('.rechthoek', { duration: 2, x: '4em', ease: 'power'});
    gsap.to('.rechthoek', {delay:1.5 , duration: 2, x: '0em', ease: 'power'});
}
function M_move(){
    gsap.to('.M', { duration: 2, x: '4em', ease: 'power'});
    gsap.to('.M', {delay:1.5 , duration: 2, x: '0em', ease: 'power'});
}
function A2_move(){
    gsap.to('.A2', { duration: 2, x: '4em', ease: 'power'});
    gsap.to('.A2', {delay:1.5 , duration: 2, x: '0em', ease: 'power'});
}
function G_move(){
    gsap.to('.G', { duration: 2, x: '4em', ease: 'power'});
    gsap.to('.G', {delay:1.5 , duration: 2, x: '0em', ease: 'power'});
}



// gsap.from('.love', { duration: 1, y: '-2em', ease: 'bounce'});
// gsap.from('.love', { duration: 1, x: '-20em', ease: 'power'});