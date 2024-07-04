/*Codigo para la captura de informacion del formulario */

//Inicializar vars / const
var nickInput;
var tamanoInput;
var emailInput;
var formEntrada;
var error;
var avatarItems;
var itemImg;
var avatarCont;

function moviendoImg(event){
    itemImg = event.target;
    console.log(itemImg.src);
}
function cambiarImg(event){
    avatarCont.src=itemImg.src;
}

/**
 * Carga de objetos del DOM, comprobaciones y eventos del formulario
 */
function domLoaded(){
    //Capturar todos los elementos
    nickInput = document.getElementById("nick");
    tamanoInput = document.getElementById("tamano");
    emailInput = document.getElementById("correo");
    formEntrada = document.getElementById("formEntrada");
    error = document.getElementById("error");

    //Comprobar si hay algun error de game.html
    if(sessionStorage.getItem('error')!=null){
        error.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }

    //Comprobamos el formulario
    formEntrada.addEventListener('submit', checkForm);

    //Eventos del D&D
    avatarItems = document.getElementsByClassName("avatarImgItem");
    for (let item of avatarItems){
        item.addEventListener('dragstart', moviendoImg);

    }
    avatarCont = document.getElementById("avatarImg");
    avatarCont.addEventListener('dragover', e=>(e.preventDefault()));
    avatarCont.addEventListener('drop', cambiarImg);
}

//Evento de enviar la informacion
function checkForm(event){
    //Comprobar cambios
    if(nickInput.value.match(/(?<!\S)[0-9]/)){
        nickInput.focus();
        event.preventDefault();
        error.innerText =" El campo nick no puede comenzar por un numero";
        return false;
    }
    else if(tamanoInput.value=="0"){
        tamanoInput.focus();
        event.preventDefault();
        error.innerText = "Es necesario seleccionar un tamaño de panel";
        return false;
    }

    //Informacion correcta
    datosUsuario(nickInput, tamanoInput, emailInput);
    historicoUsuario(nickInput);
    return true;
}

//Formulario de entrada
document.addEventListener('DOMContentLoaded', domLoaded);
//Geolocalizacion
datoGeoLocalizacion();
