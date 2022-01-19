/* Exportamos NPM INQUIRER, para manejar interactivamente la consola
   - TYPE: Es el tipo de estructura que se crea. En este caso Lista
   - NAME: Nombre que se recibe en lista
   - MESSAGE: Mensaje disparador
   - CHOICES: Arreglo de opciones disponibles a elegir */
const inquirer = require('inquirer')

require('colors')

// Creacion de opciones con inquirer
const opciones = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?'.green,
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tareas`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tareas`
            },
            {
                value: '0',
                name: '0. Salir'.red.bold
            }, 
        ]
    }
];

// Muestra menu
const menu = async() => {

    console.clear()
    console.log('========================='.rainbow)
    console.log('  Seleccione una opcion  '.green)
    console.log('=========================\n'.rainbow)

   // Inquire trabaja con promesas. Para evitar "{ option: { opcion: '1' } }", desestructuramos la opcion y devuelve solo value
   const { opcion } = await inquirer.prompt(opciones)
   
   return opcion
}

// Presionar Enter para continuar
const pausa = async() => {

    const mensaje = [
        {
            type: 'input',
            name: 'enter',
            message: (`Presiona ENTER para continuar`.green)
        }
    ]
    
    console.log('\n')
    await inquirer.prompt(mensaje)
}

// Lee el input (descripcion) de la tarea creada
const leerInput = async(mensaje) => {

    const pregunta = [
        {
            type: 'input',
            name: 'descripcion',
            mensaje,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'.red.bold
                } 
                return true
            }
        }
    ]
    
    const { descripcion } = await inquirer.prompt(pregunta)

    return descripcion
}

// Lista interactivamente las tareas para elegir cual borrar
const listadoTareasBorrar = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const index = `${i + 1}.`.green
        
        return {
            value: tarea.id,
            name: `${index} ${tarea.descripcion}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0. Cancelar'.red.bold
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas)
   
    return id  
}

// Confirmacion de borrado de tarea
const confirmarBorrado = async(mensaje) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            mensaje
        }
    ]

    const { ok } = await inquirer.prompt(pregunta)

    return ok
}

// Checklist de tareas para seleccionar las que se completaron
const mostrarListadoCheckList = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const index = `${i + 1}.`.green
        
        return {
            value: tarea.id,
            name: `${index} ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta)
   
    return ids  
}

module.exports = {
    menu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmarBorrado,
    mostrarListadoCheckList
}
