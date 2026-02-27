function login(){

    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const encontrado = usuarios.find(u =>
        u.user === user && u.password === password
    );

    if(encontrado){
        const token = "token_" + Date.now();
        localStorage.setItem("token", token);
        localStorage.setItem("sesion", JSON.stringify(encontrado));
        window.location.href = "home.html";
    }else{
        alert("Usuario o contraseña incorrectos");
    }
}

function registrar() {

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const nuevoUsuario = {
        nombre: nombre,
        apellido: apellido,
        user: user,
        password: password
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    console.log("Usuarios guardados en JSON:");
    console.log(usuarios);

}

function irCrearCuenta(){
    window.location.href = "crearcuenta.html";
}

function irLogin(){
    window.location.href = "login.html";
}

function cargarHeaderFooter(){

    fetch("header.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("header").innerHTML = data;
    });

    fetch("footer.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });

}

function verificarSesion(){

    const token = localStorage.getItem("token");

    if(!token){
        window.location.href = "login.html";
    }

}

function logout(){

    localStorage.removeItem("token");
    localStorage.removeItem("sesion");
    window.location.href = "login.html";
}

function cargarUnPokemon(){

    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
    .then(response => response.json())
    .then(data => {

        console.log(data);
        document.getElementById("nombre").innerText = data.name;
        document.getElementById("imagen").src = data.sprites.front_default;

    });

}
