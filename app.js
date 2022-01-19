// npm init -y: comando para inicializar el json de la app
require('colors')

const { guardarDB, leerDB } = require('./helpers/guardados');

const { menu, pausa, leerInput, listadoTareasBorrar, confirmarBorrado, mostrarListadoCheckList } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

const main = async () => {

    let opcion = ''

    const tareas = new Tareas()

    const tareasDB = leerDB()
        
    if (tareasDB) {
        tareas.cargarTareas(tareasDB)
    }

    // Mientras el usuario no toque "0" el sistema se repite. 
    do {

        opcion = await menu()

        switch (opcion) {
            case '1': // Crea tarea
                const descripcion = await leerInput('Descripcion:')
                tareas.crearTarea(descripcion)
                break;
            case '2': // Lista tareas
                tareas.listadoCompleto()
                break;
            case '3': // Lista teras completadas
                tareas.listarPorEstado(true)
                break;
            case '4': // Lista tareas pendientes
                tareas.listarPorEstado(false)
                break;
            case '5': // Check de tareas a completadas o pendientes
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                break;
            case '6': // Borra tarea
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if (id !== '0') {
                    const ok = await confirmarBorrado('¿Estas seguro de borrarlo?')
                    if (ok) {
                        tareas.borrarTarea(id)
                        console.log('Tarea borrada correctamente!!'.green);
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr)

        await pausa()

    } while (opcion !== '0')
}

main();

