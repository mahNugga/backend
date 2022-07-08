'use strict'

//var objection = require('objection');
//const { Model } = require('objection');
const knex = require('./conn/database');

const Especialidad = require('./models/especialidad');
const Empleado = require('./models/empleado');

//console.log(knex);
//console.log("necesito saber si se conecta!!!!");
async function borraoEspecialidad(){
    await Especialidad.query().delete().debug();
}
async function borraoEmpleado(){
    await Empleado.query().delete().debug();
}

async function insertarEspecialidad(){
    //add nueva especilidad
    const especialidad = await Especialidad.query().insert({
        nombre: 'peluquero',
        descripcion: 'agente para rapados y mas',
        estado: 1
    })

    console.log(especialidad);
}
//funcion inserccion de nuevo empleado
async function insertarEmpleado(){
    //add nueva empleado
    const empleado = await Empleado.query().insert({
        nombre: 'Elizabeth',
        apellido: 'Gavilanes',
        correo: 'prueba@nohay.com',
        password:'nohay',
        telefono:'0',
        direccion:'Duran city',
        rol: '2',
        fecha_creacion:'2022-3-14 15:15:15',
        estado: 1
    })

    console.log(empleado);
}


//insertarEspecialidad();
//insertarEmpleado();

//parte de borrados
//borraoEmpleado();
//borraoEspecialidad();
/* esta funcion es solo para pruebas finales BEWARE mofo
borrao();
*/

