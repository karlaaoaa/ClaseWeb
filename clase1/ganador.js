const ganador = JSON.parse(localStorage.getItem("ganador"));

//mostrar el ganador si existe
if(ganador){

    document.getElementById("pokemonGanador").innerHTML = `

    <div class="pokemon">

    <div class="pokemon-imagen">
    <img src="${ganador.sprites.other["official-artwork"].front_default}">
    </div>

    <div class="pokemon-info">

    <div class="nombre-contenedor">
    <p class="pokemon-id">#${ganador.id}</p>
    <h2 class="pokemon-nombre">${ganador.name}</h2>
    </div>

    </div>

    </div>
    `;
}

function jugarOtra(){

    //reinicia variables y cambia a la pantalla de elegir los pokemon
    localStorage.removeItem("poke1");
    localStorage.removeItem("poke2");
    localStorage.removeItem("ganador");

    window.location.href = "pagina1.html";
}