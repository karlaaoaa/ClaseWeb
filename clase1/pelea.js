let p1 = JSON.parse(localStorage.getItem("poke1"));
let p2 = JSON.parse(localStorage.getItem("poke2"));

let hp1 = 100;
let hp2 = 100;

let turno = 1;

let ultimoEspecialP1 = -3;
let ultimoEspecialP2 = -3;

let ultimaDefensaP1 = -2;
let ultimaDefensaP2 = -2;

let defensaActivaP1 = false;
let defensaActivaP2 = false;

//mostrar los dos pokemones
function mostrarPokemon(){

    document.getElementById("poke1").innerHTML = `
    <div class="pokemon">

    <div class="pokemon-imagen">
    <img src="${p1.sprites.other["official-artwork"].front_default}">
    </div>

    <div class="pokemon-info">

    <div class="nombre-contenedor">
    <p class="pokemon-id">#${p1.id}</p>
    <h2 class="pokemon-nombre">${p1.name}</h2>
    </div>

    <div class="pokemon-stats">
    <p class="stat">HP: ${hp1}%</p>
    </div>

    </div>
    </div>
    `;

    document.getElementById("poke2").innerHTML = `
    <div class="pokemon">

    <div class="pokemon-imagen">
    <img src="${p2.sprites.other["official-artwork"].front_default}">
    </div>

    <div class="pokemon-info">

    <div class="nombre-contenedor">
    <p class="pokemon-id">#${p2.id}</p>
    <h2 class="pokemon-nombre">${p2.name}</h2>
    </div>

    <div class="pokemon-stats">
    <p class="stat">HP: ${hp2}%</p>
    </div>

    </div>
    </div>
    `;
}

mostrarPokemon();
setTimeout(siguienteTurno, 1200);

function siguienteTurno(){

    let log = document.getElementById("logBatalla"); //aqui se escriben los eventos de la pelea

    //si el turno es impar le toca a pokemon 1 atacar y viseversa 
    let atacante = turno % 2 === 1 ? p1 : p2;
    let defensor = turno % 2 === 1 ? "p2" : "p1";

    let esP1 = turno % 2 === 1;

    let daño = Math.floor(Math.random()*20)+5; //determinar el da~no random a dar

    let tipoAtaque = "normal"; //default ataque normal

    //decidir si puede usar especial o defensa
    let puedeEspecial = esP1 
        ? turno - ultimoEspecialP1 >= 3 
        : turno - ultimoEspecialP2 >= 3;

    let puedeDefensa = esP1 
        ? turno - ultimaDefensaP1 >= 2 
        : turno - ultimaDefensaP2 >= 2;

    let decision = Math.random();

    if(puedeEspecial && decision < 0.25){
        tipoAtaque = "especial";
    }
    else if(puedeDefensa && decision < 0.45){
        tipoAtaque = "defensa";
    }

    //logica de defensa
    if(tipoAtaque === "defensa"){

        if(esP1){ //si es el pokemon 1 entonces se activa la defensa para el
            defensaActivaP1 = true;
            ultimaDefensaP1 = turno; 
        }else{
            defensaActivaP2 = true;
            ultimaDefensaP2 = turno;
        }

        log.innerHTML += `
        <div class="turno">
        Turno ${turno}: <strong>${atacante.name}</strong> 
        activó <span class="defensa">DEFENSA ESPECIAL</span>
        </div>
        `;

        turno++;

        log.scrollTop = log.scrollHeight;

        setTimeout(siguienteTurno,3000);
        return;
    }

    //el da~no para el ataque especial
    if(tipoAtaque === "especial"){

        daño = Math.floor(Math.random()*35)+15; //puede pegar mas fuerte

        if(esP1){
            ultimoEspecialP1 = turno;
        }else{
            ultimoEspecialP2 = turno;
        }

        log.innerHTML += `
        <div class="turno">
        Turno ${turno}: <strong>${atacante.name}</strong> 
        usó <span class="ataque">ATAQUE ESPECIAL</span>
        </div>
        `;
    }

    let falla = Math.random() < 0.2; //checa randomly si puede fallar el ataque

    if(falla){

        log.innerHTML += `
        <div class="turno">
        Turno ${turno}: <strong>${atacante.name}</strong> 
        <span class="fallo">falló su ataque</span>
        </div>
        `;

    }else{
        //se checa primero si hay escudo para el defensor  
        if(defensor === "p2"){

            if(defensaActivaP2){
                daño = Math.floor(daño/2); //mitad de da~no se inflinge
                defensaActivaP2 = false;
            }

            hp2 -= daño; //da~no normal inflingido

        }else{

            if(defensaActivaP1){
                daño = Math.floor(daño/2);
                defensaActivaP1 = false;
            }

            hp1 -= daño;
        }

        log.innerHTML += `
        <div class="turno">
        Turno ${turno}: <strong>${atacante.name}</strong> 
        hizo <strong>${daño}</strong> de daño
        </div>
        `;
    }

    log.scrollTop = log.scrollHeight;

    mostrarPokemon();

    //checar si un pokemon est'a muerto para terminar la batalla
    if(hp1 <= 0 || hp2 <= 0){
        terminarBatalla();
        return;
    }

    turno++;

    setTimeout(siguienteTurno,3200);
}

function terminarBatalla(){

    let ganador = hp1 > hp2 ? p1 : p2; //checa cual pokemon gano y regirige a pantalla de ganador

    localStorage.setItem("ganador", JSON.stringify(ganador));
    window.location.href = "pagina3.html"
}