'use strict'
/* const { default: knex } = require('knex'); */
const { Knex } = require('Knex');
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
            /* var fechin = await Horario.query().select(
                'horario.rango_inicio',
                'horario.rango_fin',
                'horario.hora_inicio',
                'horario.hora_fin',
                'horario.empleado_id'
            ).where('horario.rango_inicio',params.fechaing) */
            //.where('horario.rango_fin','<=',params.fechaing); 

             var fechin = await Horario.query().select(
                'horario.rango_inicio',
                'horario.rango_fin',
                'horario.hora_inicio',
                'horario.hora_fin',
                'horario.empleado_id',
                'empleado.nombre as empnombre',
                'empleado.apellido'
            ).innerJoin('empleado','horario.empleado_id','empleado.id')
            .whereRaw('? between horario.rango_inicio AND horario.rango_fin',[params.fechaing]);
            /* .then(data=>{
                console.log("buena bro!")
            });  */
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
                /* fechon:fechon, */
                message:"ahora se viene lo chido"
            });
        }catch(error){
            console.log("el mistake:"+error);
        }
    },

    consultaHorario: async function(req,res){
        var params = req.query;
        try{
            var homer = await Horario.query().select(
                'horario.nombre',
                'horario.rango_inicio',
                'horario.rango_fin',
                'horario.hora_inicio',
                'horario.hora_fin',
                'horario.id'
            ).where('horario.empleado_id',params.id)
            .where('horario.estado',1);
            if(!homer) return res.status(404).send({
                message:"no hay horarios"
            });
            return res.status(200).send({
                homer:homer,
                message:"thumbUp"
            });
        }catch(error){
            console.log(error);
        }
    },

    actualizaHorario: async function(req,res){
        var params = req.body;
        var queri = req.query;
        console.log(params);
        console.log(queri);
        try {
            var horaloca = await Horario.query().findById(queri.id)
            .patch({
                nombre:params.nombre,
                descripcion: params.descripcion,
                rango_inicio: params.rango_inicio,
                rango_fin: params.rango_fin,
                hora_inicio: params.hora_inicio,
                hora_fin: params.hora_fin,
                empleado_id: params.empleado_id
            });
            if(!horaloca) return res.status(404).send({
                message:"Error al actualizar Horario"
            });
            return res.status(200).send({
                horaloca:horaloca,
                message:"actualizaHorario metodo success!"
            });
        } catch (error) {
            console.log(error);
        }
    },

    consultaHorarioAdmin: async function(req,res){
        var params = req.query;
        try{
            var homerin = await Horario.query().select(
                'horario.nombre',
                'horario.rango_inicio',
                'horario.rango_fin',
                'horario.hora_inicio',
                'horario.hora_fin',
                'horario.estado',
                'horario.id',
                'horario.empleado_id',
                'empleado.apellido',
                'empleado.nombre as empnombre'
            ).innerJoin('empleado','horario.empleado_id','empleado.id')
            .where('horario.estado',1);
            if(!homerin) return res.status(404).send({
                message:"no hay horarios"
            });
            return res.status(200).send({
                homerin:homerin,
                message:"thumbUp"
            });
        }catch(error){
            console.log(error);
        }
    },

    softBorraHorario: async function(req,res){
        var params = req.body.params.updates[0].value;
        var queri = req.query;
        console.log(params);
        console.log("interludio musical a cargo de la orquesta sinfonica de Korea");
        console.log(queri);
        try{
            var menosUno = await Horario.query().findById(params)
            .patch({
                estado:0
            });
            if(!menosUno) return res.status(404).send({
                message:"Error al borrar un horario"
            });
            return res.status(200).send({
                menosUno:menosUno,
                message:"metodo softborraHorario success!"
            });
        }catch(error){
            console.log(error);
        }
    }

};
module.exports = control_horario;