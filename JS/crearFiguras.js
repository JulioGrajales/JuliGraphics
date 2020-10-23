export function crearCuadrado(layer, posX, posY, id) {
    const cuadrado = new Konva.Rect({
        x: posX,
        y: posY,
        width: 100,
        height: 100,
        fill: '#CB4335 ',
        stroke: '#17202A',
        strokeWidth: 1,
        draggable: true,
        id: `${id}`,
        strokeScaleEnabled: false,
        offset: { x: 50, y: 50 },
    });
    eventoYActualizar(layer, cuadrado);
}

export function crearCirculo(layer, posX, posY, id) {
    const circulo = new Konva.Circle({
        x: posX,
        y: posY,
        radius: 50,
        fill: '#28B463',
        stroke: '#17202A',
        strokeWidth: 1,
        id: `${id}`,
        draggable: true,
        strokeScaleEnabled: false,
    });
    eventoYActualizar(layer, circulo);
}

export function crearTriangulo(layer, posX, posY, id) {
    const triangulo = new Konva.RegularPolygon({
        x: posX,
        y: posY,
        sides: 3,
        radius: 60,
        fill: '#2E86C1',
        stroke: '#17202A',
        strokeWidth: 1,
        id: `${id}`,
        draggable: true,
        strokeScaleEnabled: false,
    });
    triangulo.getSelfRect = function() {
        return {
            x: -60,
            y: -60,
            width: 120,
            height: 90,
        };
    }
    eventoYActualizar(layer, triangulo);
}

export function crearFlecha(layer, posX, posY, id) {
    const flecha = new Konva.Arrow({
        x: posX,
        y: posY,
        points: [0, 0, 150, 0],
        pointerLength: 10,
        pointerWidth: 10,
        fill: 'rgba(0,0,0,1)',
        stroke: 'rgba(0,0,0,1)',
        strokeWidth: 4,
        draggable: true,
        hitStrokeWidth: 12,
        id: `${id}`,
    });
    flecha.offsetX(flecha.width() / 2);
    eventoYActualizar(layer, flecha);
}

export function crearEstrella(layer, posX, posY, id) {
    const estrella = new Konva.Star({
        x: posX,
        y: posY,
        numPoints: 5,
        innerRadius: 30,
        outerRadius: 70,
        fill: '#F1C40F',
        stroke: '#17202A',
        strokeWidth: 1,
        draggable: true,
        id: `${id}`,
        strokeScaleEnabled: false,
    });
    estrella.getSelfRect = function() {
        return {
            x: -70,
            y: -70,
            width: 140,
            height: 130,
        };
    };
    eventoYActualizar(layer, estrella);
}

export function crearPentagono(layer, posX, posY, id) {
    const pentagono = new Konva.RegularPolygon({
        x: posX,
        y: posY,
        sides: 5,
        radius: 60,
        fill: '#8E44AD ',
        stroke: '#17202A',
        strokeWidth: 1,
        draggable: true,
        id: `${id}`,
        strokeScaleEnabled: false,
    });
    pentagono.getSelfRect = function() {
        return {
            x: -60,
            y: -60,
            width: 120,
            height: 110,
        };
    };
    eventoYActualizar(layer, pentagono);
}
export function crearTexto(layer, posX, posY, id) {
    const texto = new Konva.Text({
        x: posX,
        y: posY,
        fontSize: 25,
        fill: '#17202A',
        draggable: true,
        id: `${id}`,
        text: 'Edítame desde el menú',
    });
    texto.offsetX(texto.width() / 2);
    texto.offsetY(texto.height() / 2);
    eventoYActualizar(layer, texto);
}

// FUNCION QUE AGREGA EL EVENTO DE HOVER A LAS FIGURAS, LAS AÑADE A LA CAPA Y ACTUALIZA
function eventoYActualizar(layer, figura) {
    figura.on('mouseover mouseout', eventInfo => {
        if (document.body.style.cursor == 'crosshair') return;
        document.body.style.cursor = eventInfo.type == 'mouseover' ? 'move' : 'default';
    });
    layer.add(figura);
    layer.draw();
}
// ------------------------------------------------------------------------------------