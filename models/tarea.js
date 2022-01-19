// Exportamos NPM UUIDS, para el manejo y creacion de id aleatorios
const { v4: uudiv4 } = require('uuid') 

class Tarea {

    id = '';
    descripcion = '';
    completadoEn = null;

    constructor(descripcion) {

        this.id = uudiv4();
        this.descripcion = descripcion;
        this.completadoEn = null;
    }
}

module.exports = Tarea;