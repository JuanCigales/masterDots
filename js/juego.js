/* JS para el Juego MASTERDOTS */

//VARIABLES GLOBALES
var iniciadoMarcado=false;
var adyacentes=[];
var tamanoPanel;
var classMarcado;

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

    for (let index = 0; index < adyacentes.length; index++) {
        console.log(adyacentes[index]);        
    }
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
    if (item.classList.contains('rojo')) {
        classMarcado="rojo";
        containerItem.classList.add('rojo');
    }
    else {
        classMarcado="verde";
        containerItem.classList.add('verde');
    }
    if (!iniciadoMarcado) iniciadoMarcado = true;

    calcularAdyacentes(parseInt(item.id));

    console.log("pinchado sobre un circulo");
}

function continuarMarcando(event){
    if(iniciadoMarcado){
        let item = event.target;
        let containerItem=event.target.parentElement;
        let idNuevo = parseInt(item.id);
        if (adyacentes.includes(idNuevo) && event.target.classList.contains(classMarcado)){
            if (item.classList.contains('rojo')) containerItem.classList.add('rojo');
            else containerItem.classList.add('verde'); 
            calcularAdyacentes(idNuevo);
        }
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