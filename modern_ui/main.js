const card = document.querySelector('.card');
const front = card.querySelector('.front');
const back = card.querySelector('.back');

const title = front.querySelector('.title');
const text = back.querySelector('.text');

let prev = false;
const map = (val, imin, imax, omin, omax) => (val - imin) * (omax - omin) / (imax - imin) + omin;

async function animate(from, to, step, delay, cb) {
    return new Promise(resolve => {
        const loop = setInterval(() => {
            if((from += step) > to) {
                clearInterval(loop);
                resolve();
                return;
            }
            
            cb(from);
        }, delay);
    });
}

const delay = t => new Promise(resolve => setTimeout(resolve, t)); 

let i = 0;

window.onload = () => {
    back.hidden = false;
    title.innerHTML = lang[i++]['title'];
    
    card.addEventListener('click', async() => {
        front.style.transform = `rotateY(${!prev ? 180 : 0}deg)`;
        back.style.transform = `rotateY(${!prev ? 0 : 180}deg)`;
    
        prev = !prev;
    });
}
