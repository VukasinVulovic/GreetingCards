const card = document.querySelector('.card');
const front = card.querySelector('.front');
const back = card.querySelector('.back');
let prev = false;

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

const start_angle = 90;
const end_angle = 95;
let busy = false;

window.onload = async() => {
    back.innerHTML = messsages[Math.floor(Math.random() * messsages.length)];
    back.hidden = false;
    
    card.addEventListener('click', async() => {
        if(busy)
            return;

        busy = true;

        await animate(0, 180, 1, 10, v => {
            (prev ? back : front).style.transform = `rotateY(${v}deg)`;
            (!prev ? back : front).style.transform = `rotateY(${180 - v}deg)`;
            
            if(v >= start_angle && v <= end_angle) {
                if(prev)
                    back.innerHTML = messsages[Math.floor(Math.random() * messsages.length)];

                (!prev ? back : front).style.opacity = map(v, start_angle, end_angle, 0.1, 1);
                (prev ? back : front).style.opacity = map(v, start_angle, end_angle, 1, 0.1);
            }
        });


        busy = false;
        prev = !prev;
    });
}
