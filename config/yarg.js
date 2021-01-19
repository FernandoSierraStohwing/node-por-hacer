const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'descripcion de la tarea por hacer'
};

const completado = {
    default: true,
    alias: 'c',
    desc: 'marca como completado la tarea'
}

//colocar comando y definirlos, el primero es crear, el segundo es la descripcion d elo que voy a crear y el tercero es el objeto
//en el objeto sera obligatorio el demand, el alias y una descripcion opcional.
const argv = require('yargs')
    .command('crear', 'crear un elemento por hacer', {
        descripcion
    })
    //necesito otro comando para actualizar
    .command('actualizar', 'actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'borra una tarea', {
        descripcion
    })
    .help()
    .argv

module.exports = {
    argv
}


                