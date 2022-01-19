const fs = require('fs')

const archivo = './database/data.json'

const guardarDB = ( data ) => {
    // Para almacenar, debemos pasar la data a String
    fs.writeFileSync(archivo, JSON.stringify(data))  
}

const leerDB = () => {

    // Si el archivo no existe, devolvemos null
    if (!fs.existsSync(archivo)) {
        return null
    }

    // Necesario convertirlo en Json para su lectura
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'})    
    const data = JSON.parse(info)

    return data
}

module.exports = {
    guardarDB,
    leerDB
}