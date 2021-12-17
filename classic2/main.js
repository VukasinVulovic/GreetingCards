const front = document.querySelector('.card .front');
const back = document.querySelector('.card .back');

const messsages = [
    'We wish you <br>good health <br>and<br>a lot of happiness.',
    'Let all <br>your wishes<br> become real.',
    'To radiate<br> a smile <br>and<br> remove sadness.',
    'In the new year,<br> we wish you only <br>good thoughts <br>and<br> successful battles.',
    'We wish you <br>lots of love <br>and<br>beautiful feelings.',
    'Let love follow you <br>and<br> happiness shower you.'
];

window.onload = () => {
    let prev = false;
    
    // back.hidden = false;
    document.querySelector('.card').addEventListener('click', async() => {
        front.style.transform = `rotateX(${!prev ? 180 : 0}deg)`;
        back.style.transform = `rotateX(${!prev ? 0 : 180}deg)`;
        // back.style.transform = `rotateY(${!prev ? 0 : 180}deg)`;

        if(!prev)
            back.innerHTML = messsages[Math.floor(Math.random() * messsages.length)];
    
        prev = !prev;
    });
}
