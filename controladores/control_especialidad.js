'use strict'
const {Knex} = require('Knex');
const Especialidad = require('../models/especialidad');
var Cliente = require('../models/especialidad');

var control_especialidad = {

    nuevaEspecialidad: async function(req,res){
        var params = req.body;
        try {
            var especialidad = await Especialidad.query().insert({
                nombre: params.nombre,
                descripcion: params.descripcion,
                estado:1
                           
            });
            if(!especialidad){
                return res.status(500).send({
                    message:"Error al insertar datos de especialidad en la base de datos"});
            }
            return res.status(200).send({
                cliente:cliente,
                message: "metodo nuevaEspecialidad success!"
            });
        } catch (error) {
            
        }        

    },

    listarEspecialidades: async function(req,res){
        try {
            var listaEspecialidad = await Especialidad.query().select(
                'especialidad.id',
                'especialidad.nombre',
                'especialidad.descripcion',
                'especialidad.estado'
            );
            if(!listaEspecialidad) return res.status(404).send({message:"Especialidad no existe"});
            return res.status(200).send({
                listaEspecialidad:listaEspecialidad,
                message: "metodo listar Especialidad is a success!"
            });
        } catch (error) {
            
        }

    }

};

module.exports = control_especialidad;