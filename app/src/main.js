import './style.css';

/* async function getData(poke) {
    try {
        //go get data
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
        if (response.status !== 200) { // Typically use 200-299, 200 means it is ok
            throw new Error(response);
        } else {
            const data = await response.json(); // Makes respons into json data we can use
            console.log(data.sprites[front_default]);
            document.getElementById("pokeSprite").src = data.sprites[front_default];
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getData('pikachu'); */

async function randomPoke() {
    let randomId = Math.floor(Math.random() * 1350);
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        } else {
            const data = await response.json();
            console.log(data);
        }
    } catch (error) {
        console.error('Error fetching random Pokemon:', error);
    }
}


async function loadPoke() {
    let currentpoke = randomPoke();

    console.log(currentpoke);
    document.getElementById("pokeSprite").src = `${currentpoke.sprites.front_default}`;
    console.log(currentpoke.sprites.front_default)
}

