/* JS para la gestion de datos de usuarios*/

var nick;
var tamano;
var email;
var geoLocalizacionTxt;
var avatarImg;

function datosUsuario(nick, tamano, email, avatarCont){
    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('tamano', tamano.value);
    sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('avatarImg', avatarCont.src);
    sessionStorage.setItem('geoLocalizacionTxt', geoLocalizacionTxt);
}

function getDatosUsuario(){
    nick = sessionStorage.getItem('nick');
    tamano = sessionStorage.getItem('tamano');
    email = sessionStorage.getItem('email');
    avatarImg = sessionStorage.getItem('avatarImg');
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
        geoLocalizacionTxt="El navegador no es compatible con API Geoocation";
    }
    else{
        navigator.geolocation.getCurrentPosition(
            //Exito
            (position)=>{geoLocalizacionTxt='Latitud:'+position.coords.latitude+',longitud:'+position.coords.longitude},
            //Error
            ()=>{geoLocalizacionTxt="La geolocalizacion no se ha podido realizar";}
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