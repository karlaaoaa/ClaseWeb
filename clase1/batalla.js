let pokemon1 = null;
let pokemon2 = null;

async function buscarPokemon(numero){

    const input = document.getElementById("pokemon"+numero).value.toLowerCase(); //define si se esta hablando de pokemon 1 o 2 

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    const data = await res.json();

    const carta = `
        <div class="pokemon">
            <div class="pokemon-imagen">
                <img src="${data.sprites.other["official-artwork"].front_default}">
            </div>

            <div class="pokemon-info">
                <h2>${data.name}</h2>
                <p>HP: ${data.stats[0].base_stat}</p>
                <p>Ataque: ${data.stats[1].base_stat}</p>
                <p>Defensa: ${data.stats[2].base_stat}</p>
            </div>
        </div>
    `;

    document.getElementById("carta"+numero).innerHTML = carta; //mostrar en pantalla

    //guardar la informacion de los pokemon
    if(numero === 1){
        pokemon1 = data;
    }else{
        pokemon2 = data;
    }
}

function iniciarBatalla(){

    if(!pokemon1 || !pokemon2){
        alert("Selecciona dos Pokémon"); //obligatorios 2 pokemones
        return;
    }

    localStorage.setItem("poke1", JSON.stringify(pokemon1));
    localStorage.setItem("poke2", JSON.stringify(pokemon2));

    window.location.href = "pagina2.html";
}