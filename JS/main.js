import * as funcionesDOM from './funcionesDOM.js';



const colorLienzoElemento = new JSColor('#lienzoColorElemento', {
    format: 'rgba',
    value: 'rgba(255,255,255,1)',
    onInput: function() {
        colorFondo.fill(this.toRGBAString());
        layer.draw();
    },
});
const colorFiguraElemento = new JSColor('#figuraColorElemento', {
    format: 'rgba',
    alpha: '1',
    onInput: function() {
        if (figuraElegidaLienzo.className == 'Arrow') {
            figuraElegidaLienzo.stroke(this.toRGBString());
            figuraElegidaLienzo.fill(this.toRGBString());
            layer.draw();
            return;
        }
        figuraElegidaLienzo.fill(this.toRGBAString());
        layer.draw();
    },
});
M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
const rangoBorde = document.getElementById('rangoBorde');
M.Range.init(rangoBorde, {});

let herramientaElegida = null;
let figuraElegidaLienzo = null;
let idFiguras = 0;

const containerFiguraColor = document.getElementById('containerFiguraColor');
const containerRangoBorde = document.getElementById('containerRangoBorde');
const containerEditarTexto = document.getElementById('containerEditarTexto');

const inputEditarTexto = document.getElementById('editarTexto');
const lienzoContainer = document.getElementById('lienzo');
const barraHerramientas = document.querySelectorAll('[data-figura]');
const lienzo = new Konva.Stage({
    container: 'lienzo',
    width: lienzoContainer.clientWidth,
    height: lienzoContainer.clientHeight,
});
const colorFondo = new Konva.Rect({
    x: 0,
    y: 0,
    width: lienzoContainer.clientWidth,
    height: lienzoContainer.clientHeight,
    fill: 'white',
    listening: false,
});
const layer = new Konva.Layer();
const transformadorFiguras = new Konva.Transformer({
    keepRatio: false,
    rotationSnaps: [0, 45, 90, 135, 180, 225, 270, 315],
});
const puntuacionEstrellas = document.querySelectorAll('.star');
let puntuacionElegida = false;
layer.add(transformadorFiguras);
layer.add(colorFondo);
lienzo.add(layer);


// FUNCION QUE ELIGE LA HERRAMIENTA Y CAMBIA LAS IMAGENES
barraHerramientas.forEach(figuraSelector => {

    figuraSelector.addEventListener('click', function() {

        const img = this.querySelector('img');

        if (img.getAttribute('src') != 'IMG/cancelar.png') {

            funcionesDOM.reiniciarBarraHerramientas(barraHerramientas);
            img.src = 'IMG/cancelar.png';
            document.body.style.cursor = 'crosshair';
            herramientaElegida = this.getAttribute('data-figura');

        } else {

            img.src = `IMG/${this.getAttribute('data-figura')}.png`;
            document.body.style.cursor = 'default';
            herramientaElegida = null;

        }

    })

});
// ------------------------------------------------------

// FUNCION QUE SI TIENES UN HERRAMIENTA SELECCIONADA LA INSERTA DONDE DES CLICK
lienzoContainer.addEventListener('click', eventInfo => {

    if (herramientaElegida == null) return;
    funcionesDOM.seleccionarCrearFigura(layer, herramientaElegida, eventInfo, ++idFiguras);
    funcionesDOM.reiniciarBarraHerramientas(barraHerramientas);
    document.body.style.cursor = 'move';
    herramientaElegida = null;

});
// ----------------------------------------------------------------------------

// FUNCION QUE ELIMINA FIGURAS INDIVIDUALMENTE
document.getElementById('eliminarIndividualmente').addEventListener('click', function() {
    if (figuraElegidaLienzo == null) return;
    figuraElegidaLienzo.destroy();
    transformadorFiguras.nodes([]);
    layer.draw();
    figuraElegidaLienzo = null;
    document.body.style.cursor = 'default';
    funcionesDOM.ocultarMenus(true, containerFiguraColor, containerRangoBorde, containerEditarTexto);


});
// -------------------------------------------

// FUNCION QUE ELIMINA TODAS LAS FIGURAS DEL LIENZO
document.getElementById('eliminarTodo').addEventListener('click', function() {
    // if (!confirm('¿Seguro que quieres borrar las figuras?')) return;
    for (let i = 1; i <= idFiguras; i++) {
        const figuraEncontrada = layer.findOne(`#${i}`);
        if (figuraEncontrada === undefined)
            continue;
        figuraEncontrada.destroy();
    }
    transformadorFiguras.nodes([]);
    colorFondo.fill('#ffffff');
    layer.draw();
    funcionesDOM.ocultarMenus(true, containerFiguraColor, containerRangoBorde, containerEditarTexto);
    colorLienzoElemento.fromString('rgba(255,255,255,1)');
    document.body.style.cursor = 'default';
});
// ------------------------------------------------

// FUNCION QUE DESCARGA UNA IMAGEN DEL LIENZO
document.getElementById('guardarLienzo').addEventListener('click', function() {
    funcionesDOM.descargarImagenLienzo(lienzo.toDataURL({ pixelRatio: 3 }), 'JULIGRAPHICS.png');
});
// -----------------------------------------

// FUNCION QUE REVISA SI LAS FIGURAS ESTAN SELECCIONADAS, LES PONE SU TRANSFORMADOR Y SUS MENUS
lienzo.on('click', eventInfo => {
    if (document.body.style.cursor == 'crosshair') return;
    const eventInfoTarget = eventInfo.target;
    if (eventInfoTarget.parent != null && eventInfoTarget.parent.className == "Transformer") return;

    funcionesDOM.ocultarMenus(true, containerFiguraColor, containerRangoBorde, containerEditarTexto);

    if (eventInfoTarget == lienzo) {
        transformadorFiguras.nodes([]);
        layer.draw();
        figuraElegidaLienzo = null;
        return;
    }
    transformadorFiguras.nodes([eventInfoTarget]);
    eventInfoTarget.moveToTop();
    transformadorFiguras.moveToTop();
    layer.draw();
    colorFiguraElemento.option('alphaChannel', eventInfoTarget.className == 'Arrow' ? false : true);
    funcionesDOM.ocultarMenus(false, containerFiguraColor);
    colorFiguraElemento.fromString(eventInfoTarget.fill());
    figuraElegidaLienzo = eventInfoTarget;

    if (eventInfoTarget.className != 'Text' && eventInfoTarget.className != 'Arrow') {
        rangoBorde.value = eventInfoTarget.strokeWidth();
        funcionesDOM.ocultarMenus(false, containerRangoBorde);
    }
    if (eventInfoTarget.className == 'Text') {
        inputEditarTexto.value = eventInfoTarget.text();
        funcionesDOM.ocultarMenus(false, containerEditarTexto);
    }

});
// --------------------------------------------------------------------------------------------

// FUNCION QUE ASIGNA EL BORDE A LAS FIGURAS
rangoBorde.addEventListener('input', function() {
    figuraElegidaLienzo.strokeWidth(parseInt(this.value, 10));
    layer.draw();
});
// -----------------------------------------

// FUNCION QUE CAMBIA EL TEXTO DE LAS CAJAS DE TEXTO
document.getElementById('guardarTexto').addEventListener('click', function() {
    const strTrim = funcionesDOM.limpiarString(inputEditarTexto.value);
    inputEditarTexto.value = strTrim;
    figuraElegidaLienzo.text(strTrim);
    layer.draw();
});
// -------------------------------------------------

// FUNCION QUE AGREGA EVENTOS A LAS ESTRELLAS
puntuacionEstrellas.forEach(estrella => {
    estrella.addEventListener('mouseenter', function() {
        if (puntuacionElegida) return;
        funcionesDOM.cambiarColorEstrellas(this, '#F25315');
    });
    estrella.addEventListener('mouseleave', function() {
        if (puntuacionElegida) return;
        funcionesDOM.cambiarColorEstrellas(this, '#383858');
    });
    estrella.addEventListener('click', function() {
        puntuacionEstrellas.forEach(star => {
            star.style.color = '#383858';
        });
        funcionesDOM.cambiarColorEstrellas(this, '#F25315');
        puntuacionElegida = true;
    });
});
// ------------------------------------------ 

// FUNCION QUE REINICIA EL MODAL
document.getElementById('descargar').addEventListener('click', function() {
    puntuacionEstrellas.forEach(star => {
        star.style.color = '#383858';
    });
    puntuacionElegida = false;
    document.getElementById('retroText').value = '';
});
// -----------------------------