// grabar informacion en lugar fisico, por ejemplo en file system
const fs = require('fs');
//todas las notas las almacenare en un arreglo
let listadoPorHacer = [];
// creo una constante para guardar los archivos
const guardarDB = () => {
    // tengo que pasar listadoPorHacer en json, lo hago con la funcion "JSON.stringify" 
    let data = JSON.stringify(listadoPorHacer);
    //funcion para guardarlo en el file system
    //primer arg es el path donde lo guardare, luego la data y el tercer arg es un error
    fs.writeFile('db/data.json', data, (err) =>{
        if(err) throw new Error('no se pudo grabar', err);
    });
}

const cargarDB = () =>{
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
    
    
}

//realizar la primera funcion

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    // debo crear un push para el objeto
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () =>{
    cargarDB();
    return listadoPorHacer;
}
const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex( tarea => {
        return tarea.descripcion === descripcion;
    } )
    if ( index >= 0){
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }else{
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if(listadoPorHacer.lenght === nuevoListado.length){
        return false;
    }else{
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}



module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}

