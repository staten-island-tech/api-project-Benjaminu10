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

let currentpoke = null

async function startNewRound() {
    currentpoke = await randomPoke();
    console.log("New Pokémon:", currentpoke.name);
}

async function randomPoke() {
    let randomId = Math.floor(Math.random() * 1025) + 1;
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
    if (!currentpoke) return;

    const spriteUrl = currentpoke.sprites[spriteType] || currentpoke.sprites.front_default;

    if (!spriteUrl) {
        document.getElementById(id).src = ""
        return;
    }

    document.getElementById(id).src = spriteUrl;
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
    blur.addEventListener("click", async () => {
        document.getElementById("select").classList.add("hidden");
        document.getElementById("blur").classList.remove("hidden");

        await startNewRound();
        loadPoke("pokeSprite")
    });
}

function setupBlackoutButton() {
    const blackout = document.getElementById("blackoutButton")
    blackout.addEventListener("click", async () => {
        document.getElementById("select").classList.add("hidden");
        document.getElementById("blackout").classList.remove("hidden");

        await startNewRound();
        loadPoke("pokeSprite2")
    })
}

function setupBlurButton2() {
    const blur = document.getElementById("bblurButton");
    blur.addEventListener("click", async () => {
        document.getElementById("select").classList.add("hidden");
        document.getElementById("backBlur").classList.remove("hidden");

        await startNewRound();
        loadPoke("pokeSprite3", "back_default")
    });
}

function setupBlackoutButton2() {
    const blackout = document.getElementById("bblackoutButton")
    blackout.addEventListener("click", async () => {
        document.getElementById("select").classList.add("hidden");
        document.getElementById("backBlackout").classList.remove("hidden");

        await startNewRound();
        loadPoke("pokeSprite4", "back_default")
    })
}

function checkAnswer(answer) {
    if (!currentpoke) return false;

    const isCorrect = answer.toLowerCase() === currentpoke.name.toLowerCase();

    const activeCard = document.querySelector(
        "#blur:not(.hidden), #blackout:not(.hidden), #backBlur:not(.hidden), #backBlackout:not(.hidden)"
    )


    if (!activeCard) return false;

    activeCard.classList.remove("ring-4", "ring-green-400", "ring-red-400");

    if (isCorrect) {
        activeCard.classList.add("ring-4", "ring-green-400");
    } else {
        activeCard.classList.add("ring-4", "ring-red-400");
    }

    setTimeout(() => {
        activeCard.classList.remove("ring-4", "ring-green-400", "ring-red-400");
    }, 3000)
}

function setupSubmitButton() {
    const buttons = document.querySelectorAll(".guess")
    const inputs = document.querySelectorAll(".search")

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const userGuess = inputs[index].value.trim();

            if (!userGuess) return;

            const isCorrect = checkAnswer(userGuess);

            const activeCard = document.querySelector(
                "#blur:not(.hidden), #blackout:not(.hidden), #backBlur:not(.hidden), #backBlackout:not(.hidden)"
            )

            if (!activeCard) return;

            let spriteType = "front_default";
            if (activeCard.id === "backBlur" || activeCard.id === "backBlackout") {
                spriteType = "back_default";
            }

            setTimeout(async () => {
                document.body.classList.remove(
                    "bg-green-500/50",
                    "bg-red-500/50"
                );
                inputs[index].value = "";
                
                await startNewRound();
                loadPoke(activeCard.querySelector("img").id, spriteType);
            }, 1000)
        })
    })
}

//

let pokemonList = [];

async function pokeList() {
    console.log('pokeList called');
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        } else {
            const data = await response.json();
            pokemonList = data.results.map(pokemon => pokemon.name);
            console.log(pokemonList);
        }
    } catch (error) {
        console.error('Error fetching random Pokemon:', error);
    }
}

const searchInputs = document.querySelectorAll(".search")
const suggestionLists = document.querySelectorAll(".suggestions")

searchInputs.forEach((input, index) => {
    const suggestions = suggestionLists[index]

    input.addEventListener("keyup", () => {
    const query = input.value.toLowerCase();
    suggestions.innerHTML = "";

    if (!query) return;

    const matches = pokemonList
        .filter(name => name.startsWith(query))
        .slice(0, 10);
    
    matches.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        li.className = "cursor-pointer";

        li.addEventListener("click", () => {
            input.value = name;
            suggestions.innerHTML = "";
        })

        suggestions.appendChild(li);
    })

})

})


setupBlurButton()
setupBlackoutButton()
setupBlurButton2()
setupBlackoutButton2()
setupTitleScreen()
pokeList()
setupSubmitButton()
