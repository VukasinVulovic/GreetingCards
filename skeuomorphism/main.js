const card = document.querySelector('.card');
const front = card.querySelector('.card .front');
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

let busy = false;
const leds = [];

class Led {
    constructor(color) {
        this.color = color;
        const el = document.createElement('div');
        el.setAttribute('class', `led led-${color} led-off`);

        this.el = el;
        this.on = false;
    }

    attachTo = parent => parent.appendChild(this.el);

    turnOn() {
        if(this.on)
            return;

        this.el.setAttribute('class', `led led-${this.color}`);
        this.on = true;
    }

    turnOff() { 
        if(!this.on)
            return;

        this.el.setAttribute('class', `led led-${this.color} led-off`);
        this.on = false;
    }

    toggle() {
        if(this.on)
            this.turnOff();
        else 
            this.turnOn();
    }
}


window.onload = () => {
    if(window.innerHeight > window.innerWidth) {
        alert('If you are on a mobile device, please rotate it horizontally for optimal viewing.')
    }

    let colors = ['red', 'green', 'blue', 'orange'];

    for(let i = 0; i < 5; i++) {
        const led = new Led(colors[i%4]);
        led.attachTo(document.querySelector('.leds'));
        leds.push(led);
    }
    
    let j = leds.length - 1;
    
    setInterval(async() => {
        leds[j].toggle();

        if(j-- < 1)
            j = leds.length - 1;
    }, 100);

    const audio = new Audio('./assets/audio/Jingle_Bells.mp3');
    audio.loop = true;

    const setVisibility = v => document.querySelector(':root').style.setProperty('--pseudo-visibility', v);

    card.addEventListener('click', async() => {
        if(busy)
            return;
        
        busy = true;

        let i = false;

        await animate(0, 180, 2, 5, v => {
            front.style.transform = `rotateY(${!prev ? v : (180 - v)}deg)`;
            card.style.marginLeft = `${map(v, 0, 180, !prev ? 0 : 25, prev ? 0 : 25)}%`;

            if(180-v < 90 && !i) {
                audio.currentTime = 0;
                audio[!prev ? 'play' : 'pause']();
                setVisibility(!prev ? 'visible' : 'hidden');
                i = true;
            }
        });

        busy = false;
        prev = !prev;
    });
}