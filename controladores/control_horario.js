'use strict'
//const { Knex } = require('Knex');
var Horario = require('../models/horario');

var control_horario ={

    nuevoHorario: async function(req,res){
        var params = req.body;
        console.log(params);
        try{
            var horario = await Horario.query().insert({
                nombre:params.nombre,
                descripcion: params.descripcion,
                fecha: params.fecha,
                rango_inicio: params.rango_inicio,
                rango_fin: params.rango_fin,
                hora_inicio: params.hora_inicio,
                hora_fin: params.hora_fin,
                estado:1,
                empleado_id: params.empleado_id
            });
            if(!horario){
                return res.status(500).send({
                    message:"Error al insertar Horario"
                });
            }
            return res.status(200).send({
                horario:horario,
                message:"metodo nuevoHorio success!"
            });
        }catch(error){

        }
    },

    devolverFechas: async function(req,res){
        var params = req.query;
        console.log(params);
        try{
            var fechin = await Horario.query().select(
                'horario.rango_inicio',
                'horario.rango_fin',
                'horario.hora_inicio',
                'horario.hora_fin',
                'horario.empleado_id'
            ).where('horario.rango_inicio',params.fechaing)
            //.where('horario.rango_fin','<=',params.fechaing); 

            /* var fechin = await Horario.query().select(
                'horario.rango_inicio',
                'horario.rango_fin',
                'horario.hora_inicio',
                'horario.hora_fin',
                'horario.empleado_id'
            ).whereRaw(''); */
            var fechon = await Horario.query().select(
                'horario.rango_inicio',
                'horario.rango_fin',
                'horario.fecha'
            ); 
            if(!fechin){
                return res.status(404).send({
                    message:"algo salio muy mal guacho"
                });
            }
            return res.status(200).send({
                fechin:fechin,
                fechon:fechon,
                message:"ahora se viene lo chido"
            });
        }catch(error){
            console.log("el mistake:"+error);
        }
    }

};
module.exports = control_horario;