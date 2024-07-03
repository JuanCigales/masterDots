/*Codigo para la captura de informacion del formulario */

//Inicializar vars / const
const nickInput = document.getElementById("nick");
const tamanoInput = document.getElementById("tamano");
const formEntrada = document.getElementById("formEntrada");
const error = document.getElementById("error");


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
    datosUsuario(nickInput);
    return true;
}

//Formulario de entrada
formEntrada.addEventListener('submit', checkForm);
