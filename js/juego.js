/* JS para el Juego MASTERDOTS */

//VARIABLES GLOBALES
var iniciadoMarcado=false;

/**
 * INICIALIZACION DEL PANEL
 */
function getRandom(max){
    return Math.floor(Math.random()*max);
}

function rellenarFormularioUsusario(){
    document.getElementById("nick").value=nick;
    document.getElementById("avatarImg").src=avatarImg;
}

function pintarPanelJuego(){
    document.getElementById("juego").style.gridTemplateColumns="repeat("+tamano+", 1fr)";
    document.getElementById("juego").style.gridTemplateRows="repeat("+tamano+", 1fr)";
    let items="";
    let color=["rojo", "verde"];
    let colorRnd=0;
    for (let index = 0; index < (parseInt(tamano)*parseInt(tamano)); index++){
        if (index%2>0) colorRnd=getRandom(2);
        items+=`<div class="containerItem"><div class="item ${color[colorRnd]}"></div></div>`;
    }
    document.getElementById("juego").innerHTML=items;
}


/**
 * EVENTOS DEL JUEGO
 */
function programarEventosJuego(){
    const items=document.getElementsByClassName('item');
    for (let item of items) {
        item.addEventListener('mousedown',comenzarMarcar);  //marcar
        item.addEventListener('mouseover',continuarMarcando);  //arrastrar
    }
    document.addEventListener('mouseup',finalizarMarcado);  //soltar

}

/**
 * FUNCIONES DEL JUEGO
 */
function comenzarMarcar(event){
    let item = event.target;
    let containerItem=event.target.parentElement;
    if (item.classList.contains('rojo')) containerItem.classList.add('rojo');
    else containerItem.classList.add('verde');
    if (!iniciadoMarcado) iniciadoMarcado = true;
    console.log("pinchado sobre un circulo");
}

function continuarMarcando(event){
    if(iniciadoMarcado){
        let item = event.target;
        let containerItem=event.target.parentElement;
        if (item.classList.contains('rojo')) containerItem.classList.add('rojo');
        else containerItem.classList.add('verde'); 
    }
    console.log("pasando sobre un circulo");

}

function finalizarMarcado(event){
    console.log("finalizarmarcado");
    iniciadoMarcado=false;
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