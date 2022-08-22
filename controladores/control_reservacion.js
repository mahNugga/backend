'use strict'
const {Knex} = require('Knex');
var Reservacion = require('../models/reservacion');
var Servicio = require('../models/servicio');

var control_reserva = {
    nuevaReservacion: async function(req,res){
        var params = req.body;
        console.log(params);
        try{
            var reserva = await Reservacion.query().insert({
                cabecera:params.cabecera,
                notas:params.notas,
                mensaje:params.mensaje,
                fecha:params.fechaseleccion,
                hora:params.hora,
                descuento:params.descuento,
                subtotal:params.subtotal,
                iva:params.iva,
                total:params.total,
                fecha_creado:params.fecha_creado,
                servicio_id:params.servicio_id,
                empleado_id:params.empleado_id,
                cliente_id:params.cliente_id
            });
            if(!reserva){
                return res.status(500).send({
                    message:"Error al reservar Reservacion!"
                });
            }
            return res.status(200).send({
                reserva:reserva,
                message:"Si, Si, señores!.....Barcelona"
            });

        }catch(error){
            console.log(error);
        }
    },

    mostrarReservas: async function(req,res){

    },

    muestraClientere: async function(req,res){
        var params = req.query;
        try{
            var resecliente = await Reservacion.query().select(
                'reservacion.fecha',
                'reservacion.hora',
                'reservacion.cliente_id',
                'serv.nombre',
                'serv.hora'
            ).innerJoin('servicio as serv'
            ,'reservacion.servicio_id','serv.id')
            .where('reservacion.cliente_id',params.id);
            if(!resecliente) return res.status(404).send(
                {message:"No eciste ese regitro siuuu!"}
            );
            return res.status(200).send({
                resecliente:resecliente,
                message:"thumb up"
            });
        }catch(error){
            console.log(error);
        }
    },
    muestraEmpleadore: async function(req,res){
        var params = req.query;
        try{
            var reseTrabajo = await Reservacion.query().select(
                'reservacion.fecha',
                'reservacion.hora',
                'reservacion.cliente_id'
            ).innerJoin(Servicio.query().select(
                'servicio.nombre',
                'servicio.hora',
                'servicio.id'
            ),'reservacion.servicio_id','servicio.id')
            .where('reservacion.empleado_id',params.id);
            if(!reseTrabajo) return res.status(404).send(
                {message:"No eciste ese regitro siuuu!"}
            );
            return res.status(200).send({
                reseTrabajo:reseTrabajo,
                message:"thumb up"
            });
        }catch(error){
            console.log(error);
        }
    }
};
module.exports = control_reserva;