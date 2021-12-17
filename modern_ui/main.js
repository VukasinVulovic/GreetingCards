const card = document.querySelector('.card');
const front = card.querySelector('.front');
const back = card.querySelector('.back');

const title = front.querySelector('.title');
const text = back.querySelector('.text');

const map = (val, imin, imax, omin, omax) => (val - imin) * (omax - omin) / (imax - imin) + omin;

const messsages = [
    'We wish you <br>good health <br>and<br>a lot of happiness.',
    'Let all <br>your wishes<br> become real.',
    'To radiate<br> a smile <br>and<br> remove sadness.',
    'In the new 2022,<br> we wish you only <br>good thoughts <br>and<br> successful battles.',
    'We wish you <br>lots of love <br>and<br>beautiful feelings.',
    'Let love follow you <br>and<br> happiness shower you.'
];

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
    let prev = false;
    
    back.hidden = false;
    card.addEventListener('click', async() => {
        front.style.transform = `rotateY(${!prev ? 180 : 0}deg)`;
        back.style.transform = `rotateY(${!prev ? 0 : 180}deg)`;

        if(!prev)
            back.innerHTML = messsages[Math.floor(Math.random() * messsages.length)];
    
        prev = !prev;
    });
}
