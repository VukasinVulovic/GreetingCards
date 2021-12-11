const card = document.querySelector('.card');
const front = card.querySelector('.front');
const back = card.querySelector('.back');
let prev = false;

window.onload = () => {
    back.hidden = false;
    
    card.addEventListener('click', async() => {
        front.style.transform = `rotateY(${!prev ? 180 : 0}deg)`;
        back.style.transform = `rotateY(${!prev ? 0 : 180}deg)`;
    
        prev = !prev;
    });
}
