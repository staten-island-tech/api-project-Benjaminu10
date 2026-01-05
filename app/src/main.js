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


async function loadPoke() {
    const currentpoke = await randomPoke();

    if (!currentpoke) {
        return;
    } else {
        document.getElementById("pokeSprite").src = currentpoke.sprites.front_default;
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
    });
}

loadPoke()
setupBlurButton()
setupTitleScreen()
