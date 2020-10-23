import * as crearFigura from './crearFiguras.js';

// FUNCION QUE POR MEDIO DE UN SWITCH DETERMINA LA FIGURA QUE SE DESEA INSERTAR
export function seleccionarCrearFigura(layer, figuraElegidaLista, { layerX: posX, layerY: posY }, id) {
    switch (figuraElegidaLista) {
        case 'cuadrado':
            crearFigura.crearCuadrado(layer, posX, posY, id);
            break;
        case 'circulo':
            crearFigura.crearCirculo(layer, posX, posY, id);
            break;
        case 'triangulo':
            crearFigura.crearTriangulo(layer, posX, posY, id);
            break;
        case 'flecha':
            crearFigura.crearFlecha(layer, posX, posY, id);
            break;
        case 'estrella':
            crearFigura.crearEstrella(layer, posX, posY, id);
            break;
        case 'pentagono':
            crearFigura.crearPentagono(layer, posX, posY, id);
            break;
        case 'texto':
            crearFigura.crearTexto(layer, posX, posY, id);
            break;
    }
}
// ----------------------------------------------------------------------------

// FUNCION QUE REINICIA LA BARRA DE HERRAMIENTAS 
export function reiniciarBarraHerramientas(nodelist) {
    nodelist.forEach(item => {
        const img = item.querySelector('img');
        const dataFigura = item.getAttribute('data-figura');
        if (img.getAttribute('src') != `IMG/${dataFigura}.png`)
            img.src = `IMG/${dataFigura}.png`;
    });
}
// ----------------------------------------------

// FUNCION QUE DESCARGA UNA IMAGEN DEL LIENZO
export function descargarImagenLienzo(uri, name) {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
// ------------------------------------------

// FUNCION QUE ELIMINA LOS ESPACIOS EN BLANCO DEL INICIO Y EL FINAL, SI ES STRING VACIO SE ASIGNA VALOR POR DEFECTO
export function limpiarString(string) {
    const strTrim = string.trim();
    return strTrim.length === 0 ? 'Editame desde el menú' : strTrim;
}
// ----------------------------------------------------------------------------------------------------------------

// FUNCION QUE DADA UNA LISTA DE CONTAINERS Y UN BOOLEANO DETERMINA SI LOS OCULTA O NO
export function ocultarMenus(ocultar, ...containers) {
    if (ocultar)
        for (const container of containers)
            container.classList.add('hide');
    else
        for (const container of containers)
            container.classList.remove('hide');
}
// -----------------------------------------------------------------------------------  

// FUNCION QUE CAMBIA EL COLOR DE LAS ESTRELLAS
export function cambiarColorEstrellas(node, starColor) {
    node.style.color = starColor;
    if (node.parentElement.previousElementSibling === null)
        return;
    cambiarColorEstrellas(node.parentElement.previousElementSibling.firstElementChild, starColor);
}
// --------------------------------------------