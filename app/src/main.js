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
    let randomId = Math.floor(Math.random() * 1025);
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        } else {
            const data = await response.json();
            return(data);
        }
    } catch (error) {
        console.error('Error fetching random Pokemon:', error);
    }
}


async function loadPoke(id, spriteType) {
    const currentpoke = await randomPoke();

    if (!currentpoke) {
        return;
    } else {
        document.getElementById(`${id}`).src = currentpoke.sprites[spriteType] || currentpoke.sprites.front_default;
        console.log(currentpoke);
    }

}

async function loadCry(id) {
    const currentpoke = await randomPoke();

    if (!currentpoke) {
        return;
    } else {
        document.getElementById(`${id}`).src = currentpoke.cries.latest;
        console.log(currentpoke);
    }

}

function setupTitleScreen() {
    document.addEventListener("keydown", (event) => {
    const app = document.getElementById("app")
    const selectScreen = document.getElementById("select")

    if (
        app &&
        !app.classList.contains("hidden") &&
        event.key === "Enter"
    ) {
        if (selectScreen) app.classList.add("hidden");
        selectScreen.classList.remove("hidden");
        //START GAME HERE
    }
});
}

function setupBlurButton() {
    const blur = document.getElementById("blurButton");
    blur.addEventListener("click", () => {
        document.getElementById("select").classList.add("hidden");
        document.getElementById("blur").classList.remove("hidden");
        loadPoke("pokeSprite")
    });
}

function setupBlackoutButton() {
    const blackout = document.getElementById("blackoutButton")
    blackout.addEventListener("click", () => {
        document.getElementById("select").classList.add("hidden");
        document.getElementById("blackout").classList.remove("hidden");
        loadPoke("pokeSprite2")
    })
}

function setupBlurButton2() {
    const blur = document.getElementById("bblurButton");
    blur.addEventListener("click", () => {
        document.getElementById("select").classList.add("hidden");
        document.getElementById("backBlur").classList.remove("hidden");
        loadPoke("pokeSprite3", "back_default")
    });
}

function setupBlackoutButton2() {
    const blackout = document.getElementById("bblackoutButton")
    blackout.addEventListener("click", () => {
        document.getElementById("select").classList.add("hidden");
        document.getElementById("backBlackout").classList.remove("hidden");
        loadPoke("pokeSprite4", "back_default")
    })
}

//

const pokemon = {
}

async function pokeList() {
    console.log('pokeList called');
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        } else {
            const data = await response.json();
            const list = data.results.map(pokemon => pokemon.name);
            console.log(list);
        }
    } catch (error) {
        console.error('Error fetching random Pokemon:', error);
    }
}
const searchInput = document.getElementById(".search")


function setupCriesButton() {
    const cries = document.getElementById("criesButton")
    cries.addEventListener("click", () => {
        document.getElementById("select").classList.add("hidden");
        document.getElementById("cries").classList.remove("hidden");
        loadCry("criesAudio")
    })
}

setupBlurButton()
setupBlackoutButton()
setupBlurButton2()
setupBlackoutButton2()
setupCriesButton()
setupTitleScreen()
pokeList()
