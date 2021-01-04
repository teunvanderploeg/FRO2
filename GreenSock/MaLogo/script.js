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
    gsap.to('.body', {backgroundColor: "#eeeeee", duration:1});
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

gsap.from('.svg', { duration: 1, y: '-10em', ease: 'bounce'});
gsap.from('.svg', { duration: 1, x: '-30em', ease: 'power'});


function love_move(){

const count = 25;
const blurCount = 20;
const stage = document.querySelector(".stage");

for (let i = 0; i < count; i++) {
	setTimeout(() => {
		makeLight(i);
	}, 50 * i);
}

function makeLight(i) {
	let span = document.createElement("span");
	if (i < blurCount) {
		span.classList.add("blur");
	}
	stage.appendChild(span);

	gsap.set(span, {
		left: gsap.utils.random(0, stage.offsetWidth),
		top: gsap.utils.random(0, stage.offsetHeight),
		scale: gsap.utils.random(.8, 1.2, .1),
		opacity: 0
	});

	let tl = gsap.timeline({
		paused: true,
		onComplete: () => {
			span.remove();
			makeLight(i);
		}
	})

	if (i < blurCount) {
		tl.to(span, {
			opacity: gsap.utils.random(.1, .2),
			duration: .3
		})
		tl.to(span, {
			x: gsap.utils.random(-100, 100),
			y: gsap.utils.random(-100, 100),
			duration: gsap.utils.random(5, 7, .2),
			ease: Power0.easeNone
		}, -.3)
		tl.to(span, {
			opacity: 0,
			duration: .3
		}, ">-.3")
	} else {
		tl.to(span, {
			opacity: gsap.utils.random(.5, .8),
			duration: .3
		})
		tl.to(span, {
			x: gsap.utils.random(-40, 40),
			y: gsap.utils.random(-40, 40),
			duration: gsap.utils.random(5, 7, .2),
			ease: Power0.easeNone
		}, -.3)
		tl.to(span, {
			opacity: 0,
			duration: .3
		}, ">-.3")
	}
	tl.play();
}
}