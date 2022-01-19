const Tarea = require("./tarea");

class Tareas {

    // Listado de tareas. No es arreglo, sino objeto de objetos
    _listado = {};

    constructor() {
        this._listado = {};
    }

    // Listado de tareas como array y no objeto de objetos
    get listadoArr() {
        
        const listado = []
        
        // Object.keys() devuelve array de keys/ID (tareas que tenemos en _listado) que recorremos para guardar cada tarea en el array
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })
        
        return listado
    }
    
    // Creacion y agregacion de tarea
    crearTarea(descripcion) {

        const tarea = new Tarea(descripcion)
        this._listado[tarea.id] = tarea
    }

    // Recorremos el array tareasDB para asignarlas al _listado 
    cargarTareas(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        });
    }

    // Listamos las tareas con: Indice, y un color segun completada o pendiente
    listadoCompleto() {

        console.log()
        this.listadoArr.forEach((tarea, i) => {

            const index = `${i + 1}`.green
            const { descripcion, completadoEn } = tarea
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red

            console.log(`${index} ${descripcion} :: ${estado}`);
        })
    }

    // Listamos tareas completas o pendientes
    listarPorEstado(completadas = true) {
        
        console.log()

        let contador = 0

        this.listadoArr.forEach((tarea) => {
           
            const { descripcion, completadoEn } = tarea
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red

            if (completadas) {
                if (completadoEn) {
                    contador += 1
                    console.log(`${(contador + '.').green} ${descripcion} :: ${completadoEn.green}`)
                }
            } else {
                if (!completadoEn) {
                    contador += 1
                    console.log(`${(contador + '.').red} ${descripcion} :: ${estado}`)
                }
            }
        }) 
    } 

    // Borrar tareas segun id
    borrarTarea(id) {

        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    // Toggle que maneja tareas pendientes a completadas  
    toggleCompletadas(ids = []) {

        ids.forEach(id => {

            // Si la tarea esta pendiente, la cambio a completada 
            const tarea = this._listado[id]
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        // Si la tarea esta completada, la cambio a pendiente
        this.listadoArr.forEach( tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null
            }
        })

    }
}

module.exports = Tareas