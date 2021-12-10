const card = document.querySelector('.card');
const front = document.querySelector('.front');
const back = document.querySelector('.back');

async function animate(from, to, step, interval, cb) {
    return new Promise(resolve => {
        const loop = () => {
            if(from >= to) {
                clearInterval(loop);
                resolve();
                return;
            }
            
            cb(from);
            from += step;
        }

        setInterval(loop, interval);
    });
}

let busy = false;
let prev = false;

card.addEventListener('click', async() => {
    if(busy)
        return;

    busy = true;

    await animate(0, 180, 10, 10, rot => {
        if(!prev) {
            front.style.transform = `rotateY(${rot}deg)`;
            back.style.transform = `rotateY(${180-rot}deg)`;
        } else {
            front.style.transform = `rotateY(${180 - rot}deg)`;
            back.style.transform = `rotateY(${rot}deg)`;
        }
    });

    busy = false;
    prev = !prev;
});