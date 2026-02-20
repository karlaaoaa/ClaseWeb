function login(){

    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const encontrado = usuarios.find(u =>
        u.user === user && u.password === password
    );

    if(encontrado){
        alert("Login correcto");
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

