/* JS para la gestion de datos de usuarios*/

var nick;

function datosUsuario(nick){
    sessionStorage.setItem('nick', nick.value);
    historicoUsuario(nick);
}

function getDatosUsuario(){
    nick = sessionStorage.getItem('nick');
    console.log(nick);
}

function comprobacionDeDatosUsuario(){
    if(nick == null){
        sessionStorage.setItem('error', 'Buen intento pero no. Rellena el formulario machiner');
        return false;
    }
    return true;
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