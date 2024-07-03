/*Codigo para la captura de informacion del formulario */

//Inicializar vars / const
const nickInput = document.getElementById("nick");
const tamanoInput = document.getElementById("tamano");
const formEntrada = document.getElementById("formEntrada");

//Evento de enviar la informacion
function checkForm(event){
    //Comprobar cambios
    if(nickInput.value.length == 0){
        console.log("No hay nick");
        nickInput.focus();
        return false;
    }
    else if(tamanoInput.value=="0"){
        console.log("No se ha seleccionado panel");
        tamanoInput.focus();
        event.preventDefault();
        return false;
    }
    return true;
}

//Formulario de entrada
formEntrada.addEventListener('submit', checkForm);
