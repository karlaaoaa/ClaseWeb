const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/";


let pokemones = [];
for (let i = 1; i <= 500; i++){ //por cada pokemon se llama la funcion de mostrar
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => {
            pokemones.push(data);
            if(pokemones.length === 500){ //se espera a que tenga todos los pokemones para ordenarlos
                pokemones.sort((a,b) => a.id - b.id);
                pokemones.forEach(p => mostrarPokemon(p));
            }
        })
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    //agrega 0 para que sea de 3 digitos el id
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    //le agrega el current pokemon a esta estructura de div y la agrega despues a al div donde se muestran todos los pokemones
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${(poke.height*10/100)}m</p>
                <p class="stat">${(poke.weight/10)}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

function activarBotones(){
    const botonesHeader = document.querySelectorAll(".btn-header");

    botonesHeader.forEach(boton => {

        boton.addEventListener("click", () => {

            const botonId = boton.id;

            listaPokemon.innerHTML = "";

            if(botonId === "ver-todos"){ //condición para mostrar todos los pokemones
                pokemones.forEach(p => mostrarPokemon(p));
            } else {
                //condición para solo mostrar los pokemones filtrados por tipo
                const filtrados = pokemones.filter(pokemon => 
                    pokemon.types.some(tipo => tipo.type.name === botonId) 
                );
                filtrados.forEach(p => mostrarPokemon(p));
            }

        });

    });
}

async function buscarPokemon() {
    const input = document.getElementById("buscarPokemon").value.toLowerCase();
    const listaPokemon = document.getElementById("listaPokemon");

    listaPokemon.innerHTML = "";

    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        const data = await response.json();

        mostrarPokemon(data); //busca el pokemon apartir del input del filtrado
    } catch (error) {
        listaPokemon.innerHTML = "<p>Pokemon no encontrado</p>"; //si no encuentra el pokemon manda mensaje de error
    }
    
}