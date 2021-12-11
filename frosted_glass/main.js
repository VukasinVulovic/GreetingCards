const card = document.querySelector('.card');
const front = card.querySelector('.front');
const back = card.querySelector('.back');
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

const start_angle = 90;
const end_angle = 95;
let busy = false;

window.onload = async() => {
    
    back.hidden = false;
    
    card.addEventListener('click', async() => {
        if(busy)
            return;

        busy = true;

        await animate(0, 180, 1, 10, v => {
            (prev ? back : front).style.transform = `rotateY(${v}deg)`;
            (!prev ? back : front).style.transform = `rotateY(${180 - v}deg)`;
            
            if(v >= start_angle && v <= end_angle) {
                (!prev ? back : front).style.opacity = map(v, start_angle, end_angle, 0.1, 1);
                (prev ? back : front).style.opacity = map(v, start_angle, end_angle, 1, 0.1);
            }
        });

        busy = false;
        // front.style.transform = `rotateY(${!prev ? 180 : 0}deg)`;
        // back.style.transform = `rotateY(${!prev ? 0 : 180}deg)`;
        
        // front.style.opacity = !prev ? 0.1 : 1;
        // back.style.opacity = !prev ? 1 : 0.1;
    

        prev = !prev;
    });
}
