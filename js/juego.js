/* JS para el Juego MASTERDOTS */

//VARIABLES GLOBALES
var iniciadoMarcado=false;
var adyacentes=[];
var tamanoPanel;
var classMarcado;
var idMarcadas=[];
var idInterval;

/**
 * INICIALIZACION DEL PANEL
 */
function getRandom(max){
    return Math.floor(Math.random()*max);
}

function rellenarFormularioUsusario(){
    document.getElementById("nick").value=nick;
    document.getElementById("avatarImg").src=avatarImg;
    tamanoPanel=parseInt(tamano);
}

function pintarPanelJuego(){
    document.getElementById("juego").style.gridTemplateColumns="repeat("+tamano+", 1fr)";
    document.getElementById("juego").style.gridTemplateRows="repeat("+tamano+", 1fr)";
    let items="";
    let color=["rojo", "verde"];
    let colorRnd=0;
    for (let index = 0; index < (parseInt(tamano)*parseInt(tamano)); index++){
        if (index%2>0) colorRnd=getRandom(2);
        items+=`<div class="containerItem"><div id="${index}" class="item ${color[colorRnd]}"></div></div>`;
    }
    document.getElementById("juego").innerHTML=items;
}

/**
 * Calcula el adyacente
 */
function calcularAdyacentes(idMarcado){
    adyacentes=[];
    // 4 tipos de adyacecians (superior, inferior, lateral derecho y lateral izquierd)
    if((idMarcado-tamanoPanel) >= 0) adyacentes.push(idMarcado-tamanoPanel);                        //Check de superior
    if((idMarcado+tamanoPanel) < (tamanoPanel*tamanoPanel)) adyacentes.push(idMarcado+tamanoPanel); //Check de inferior
    if((idMarcado%tamanoPanel) > 0) adyacentes.push(idMarcado-1);                                   //Check de izquierda
    if(((idMarcado+1)%tamanoPanel) > 0) adyacentes.push(idMarcado+1);                               //Check de derecha         


    /*for (let index = 0; index < adyacentes.length; index++) {
        console.log(adyacentes[index]);        
    }*/
}

/**
 * EVENTOS DEL JUEGO
 */
function programarEventosJuego(){
    const items=document.getElementsByClassName('item');
    for (let item of items) {
        item.addEventListener('mousedown',comenzarMarcar);      //marcar
        item.addEventListener('mouseover',continuarMarcando);   //arrastrar
    }   
    document.addEventListener('mouseup',finalizarMarcado);      //soltar

    idInterval = setInterval(cuentaAtras, 1000);                //cuenta atras
}

/**
 * FUNCIONES DEL JUEGO
 */
function comenzarMarcar(event){
    let item = event.target;
    let containerItem=event.target.parentElement;
    if (item.classList.contains('rojo')) {
        classMarcado="rojo";
        containerItem.classList.add('rojo');
    }
    else {
        classMarcado="verde";
        containerItem.classList.add('verde');
    }
    if (!iniciadoMarcado) iniciadoMarcado = true;
    idMarcadas.push(parseInt(item.id));
    calcularAdyacentes(parseInt(item.id));

    //console.log("pinchado sobre un circulo");
}

function continuarMarcando(event){
    if(iniciadoMarcado){
        let item = event.target;
        let containerItem=event.target.parentElement;
        let idNuevo = parseInt(item.id);
        if(idMarcadas.includes(idNuevo)){
            console.log("Si lo tiene nene");
        }
        if (adyacentes.includes(idNuevo) && event.target.classList.contains(classMarcado) && !idMarcadas.includes(idNuevo)){
            if (item.classList.contains('rojo')) containerItem.classList.add('rojo');
            else containerItem.classList.add('verde'); 
            idMarcadas.push(idNuevo);
            calcularAdyacentes(idNuevo);
        }
    }
    //console.log("pasando sobre un circulo");
}

function finalizarMarcado(event){
    //Reset de algunas de las variables globales
    iniciadoMarcado=false;
    adyacentes=[];

    //antes podriamos ir calculando la puntuacion
    const puntuacionInput = document.getElementById("puntuacion");
    if (idMarcadas.length>1) {
        puntuacionInput.value = parseInt(puntuacionInput.value)+idMarcadas.length*10;

        //generamos nuevos colores
        for (let i = 0; i < idMarcadas.length; i++){
            //eliminamos el color
            let itemMarcado=document.getElementById(idMarcadas[i]);
            itemMarcado.parentElement.classList.remove(classMarcado);
            //cambiar color de los objetos de forma random
            let color = ["rojo", "verde"];
            let colorRnd = getRandom(2);
            itemMarcado.classList.remove(classMarcado);
            itemMarcado.classList.add(color[colorRnd]);
        }
    }
    else{
        //desmarcamos (seria remove del padre que es quien da el efecto de marcado)
        let itemMarcado=document.getElementById(idMarcadas[0]);
        itemMarcado.parentElement.classList.remove(classMarcado);
    }
    
    idMarcadas=[];
    //console.log(idMarcadas.length);
    console.log("finalizarmarcado");
}

/**
 * funcion que se encarga del conteo hacia atras/tiempo de juego
 */
function cuentaAtras(){
    let tiempoRestante = (document.getElementById("tmpo").value)-1;
    document.getElementById("tmpo").value = tiempoRestante;
    //cuando el tiempo restante es 0 finalizamos partida
    if(tiempoRestante == 0){
        clearInterval(idInterval);
        finalizarPartida();
    }
}

/**
 * Funcion para finalizar la partida
 */
function finalizarPartida(){
    const items=document.getElementsByClassName('item');
    for (let item of items) {
        item.removeEventListener('mousedown',comenzarMarcar);      //marcar
        item.removeEventListener('mouseover',continuarMarcando);   //arrastrar
    }   
    document.removeEventListener('mouseup',finalizarMarcado);      //soltar

    //Ponemos la pantalla de fin de partida
    document.getElementById("juegoAcabado").classList.add("juegoAcabadoColor");
    document.getElementById("juegoAcabado").style.zIndex=2;
    document.getElementById("juego").style.zIndex=1;
    document.getElementById("nuevaPartida").addEventListener("click",(event)=>location.reload());
}


/**
 * MAIN DEL JUEGO
 */
//Capturamos los datos usuario
getDatosUsuario();
//Comprobamos los datos
if(!comprobacionDeDatosUsuario()) location="index.html";
//Rellenamos fomulario
rellenarFormularioUsusario();
pintarPanelJuego();
programarEventosJuego();