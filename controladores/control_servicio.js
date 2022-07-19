'use strict'
const {Knex} = require('Knex');
var Servicio = require('../models/servicio');

var control_servicio = {

    nuevoServicio: async function(req,res){
        var params = req.body;

        try {
            var servicio = await Servicio.query().insert({
                nombre: params.nombre,
                descripcion: params.descripcion,
                hora:params.hora,
                estado: 1
                           
            });
            if(!servicio){
                return res.status(500).send({
                    message:"Error al insertar datos de servicio en la base de datos"});
            }
            return res.status(200).send({
                servicio:servicio,
                message: "metodo nuevoServicio success!"
            });
        } catch (error) {
            
        }        
    },

    listarServicios: async function(req,res){
        try {
            var listaServicio = await Servicio.query().select(
                'insumo.id',
                'insumo.nombre',
                'insumo.descripcion',
                'insumo.hora',
                'insumo.estado'
            );
            if(!listaServicio) return res.status(404).send({message:"Servicio no existe"});
            return res.status(200).send({
                listaEmpleado:listaEmpleado,
                message: "metodo listar Servicios is a success!"
            });
        } catch (error) {
            
        }

    }
};

module.exports = control_servicio;