import './style.css';

async function getData(poke) {
    try {
        //go get data
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
        if (response.status !== 200) { // Typically use 200-299, 200 means it is ok
            throw new Error(response);
        } else {
            const data = await response.json(); // Makes respons into json data we can use
            console.log(data);
            document.getElementById("api-response").textContent = data.name;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getData('pikachu');

data.results.forEach(item => {
    console.log(item.name);
});