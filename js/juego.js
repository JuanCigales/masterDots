/* JS para el Juego MASTERDOTS */
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

function programarEventosJuego(){
    const items=document.getElementsByClassName('item');
    for (let item of items) {
        item.addEventListener('mousedown',comenzarMarcar);
    }
}

function comenzarMarcar(event){
    let item = event.target;
    let containerItem=event.target.parentElement;
    if (item.classList.contains('rojo')) containerItem.classList.add('rojo');
    else containerItem.classList.add('verde');

    console.log("pinchado sobre un circulo");
}

//Capturamos los datos usuario
getDatosUsuario();
//Comprobamos los datos
if(!comprobacionDeDatosUsuario()) location="index.html";
//Rellenamos fomulario
rellenarFormularioUsusario();
pintarPanelJuego();
programarEventosJuego();