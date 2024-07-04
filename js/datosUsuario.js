/* JS para la gestion de datos de usuarios*/

var nick;
var tamano;
var email;
var geoLocalizacionTxt;

function datosUsuario(nick, tamano, email){
    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('tamano', tamano.value);
    sessionStorage.setItem('email', email.value);
}

function getDatosUsuario(){
    nick = sessionStorage.getItem('nick');
    tamano = sessionStorage.getItem('tamano');
    email = sessionStorage.getItem('email');
}

function comprobacionDeDatosUsuario(){
    if (nick == null){
        sessionStorage.setItem('error', 'Buen intento pero no. Rellena el formulario machiner');
        return false;
    }
    return true;
}

function datoGeoLocalizacion(){
    if (!navigator.geolocation){
        geoLocalizacionTxt = "El navegador no es compatible con API Geoocation";
    }
    else{
        navigator.geolocation.getCurrentPosition(
            //Exito
            (position)=>{geoLocalizacionTxt='Latitud'+position.coords.latitude+', Longitud'+position.coords.longitude},

            //Fallo
            ()=>{geoLocalizacionTxt = "El navegador no es compatible con API Geoocation";}
        )
    }
}

//localStorage
function historicoUsuario(nick){
    let historicoStorage = localStorage.getItem('historico');
    let historicoArray;
    if(historicoStorage == null){
        historicoArray = [];
    }
    else{
        historicoArray = JSON.parse(historicoStorage);
    }
    let registroUsuario = {
        usuario:nick.value,
        fecha:Date.now()
    }
    historicoArray.push(registroUsuario);
    localStorage.setItem('historico', JSON.stringify(historicoArray));
}