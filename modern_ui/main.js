const card = document.querySelector('.card');
const front = card.querySelector('.front');
const back = card.querySelector('.back');

const title = front.querySelector('.title');
const text = back.querySelector('.text');

let prev = false;

const lang = [
    {
        'title': 'Happy<br>new<br>year!',
        'message': 'Students from ITHS would like to wish you a Happy New Year. <br>We\'re happy to have you join us in this wonderful project.'
    },
    {
        'title': 'Срећна<br>нова<br>година!',
        'message': 'Ученици ИТХС-а вам желе срећну Нову годину.<br>Срећни смо што нам се придружите у овом дивном пројекту.'
    },
    {
        'title': 'Feliz<br>año<br>nuevo!',
        'message': 'A los estudiantes de ITHS les gustaría desearle un Feliz Año Nuevo. Estamos felices de que se una a nosotros en este maravilloso proyecto.'
    },
    {
        'title': 'Szczęśliwego<br>Nowego<br>Roku.',
        'message': 'Studenci ITHS życzą Państwu szczęśliwego Nowego Roku.<br>Cieszymy się, że dołączyłeś do nas w tym wspaniałym projekcie.'
    },
    {
        'title': 'Yeni Yılın<br>Kutlu<br>Olsun!',
        'message': 'Studenci ITHS życzą Państwu szczęśliwego Nowego Roku.<br>Cieszymy się, że dołączyłeś do nas w tym wspaniałym projekcie.'
    }
];


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

    const change = async() => {
        if(i >= lang.length)
            i = 0;

        await animate(0, 1, 0.1, 10, v => {
            text.style.color = `rgba(0, 0, 0, ${1-v})`;
            title.style.color = `rgba(0, 0, 0, ${1-v})`;
        });

        text.innerHTML = lang[i]['message'];
        title.innerHTML = lang[i++]['title'];

        await delay(10);

        await animate(0, 1, 0.1, 10, v => {
            title.style.color = `rgba(0, 0, 0, ${v})`;
            text.style.color = `rgba(0, 0, 0, ${v})`;
        });

        setTimeout(change, 2500);
    }

    // setTimeout(change, 2500);
}