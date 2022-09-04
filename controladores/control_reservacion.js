'use strict'
const {Knex} = require('Knex');
var Reservacion = require('../models/reservacion');
var EstadoReserva = require('../models/estadoReserva');
//var Servicio = require('../models/servicio');
var Cliente = require('../models/cliente');

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
                cliente_id:params.cliente_id,
                estado_id:1
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
                'serv.hora as ora'
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
                'reservacion.cliente_id',
                'reservacion.estado_id',
                's.nombre as servicio',
                's.id',
                'c.nombre',
                'c.apellido'
            ).innerJoin('servicio as s'
            ,'reservacion.servicio_id','s.id')
            .innerJoin('cliente as c'
            ,'reservacion.cliente_id','c.id')
            .where('reservacion.empleado_id',params.id)
            .where('reservacion.fecha',params.fechaing);
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
    },
    muestraOneEmpleadore: async function(req,res){
        var params = req.query;
        try{
            var reseNex = await Reservacion.query().select(
                'reservacion.fecha',
                'reservacion.hora',
                'reservacion.servicio_id',
                'reservacion.cliente_id',
                's.nombre as servicio',
                's.id',
                'c.nombre',
                'c.apellido'
            ).innerJoin('servicio as s'
            ,'reservacion.servicio_id','s.id')
            .innerJoin('cliente as c'
            ,'reservacion.cliente_id','c.id')
            .where('reservacion.empleado_id',params.id).limit(1);
            if(!reseNex) return res.status(404).send({
                message:"sin reservacion que mostar"
            });
            return res.status(200).send({
                reseNex:reseNex,
                message:"metodo muestra siguiente trabajo success!"
            });
        }catch(error){
            console.log(error);
        }
    },

    muestraAdminadore: async function(req,res){
        var params = req.query;
        try{
            var reseDe = await Reservacion.query().select(
                'reservacion.fecha',
                'reservacion.hora',
                'reservacion.cliente_id',
                'reservacion.estado_id as estado',
                's.nombre as servicio',
                's.id',
                'c.nombre',
                'c.apellido',
                'empleado.apellido as empleado'
            ).innerJoin('servicio as s'
            ,'reservacion.servicio_id','s.id')
            .innerJoin('cliente as c'
            ,'reservacion.cliente_id','c.id')
            .innerJoin('empleado','reservacion.empleado_id','empleado.id');
            if(!reseDe) return res.status(404).send(
                {message:"No eciste ese regitro siuuu!"}
            );
            return res.status(200).send({
                reseDe:reseDe,
                message:"thumb up"
            });
        }catch(error){
            console.log(error);
        }
    },

    buscaFechacontraFecha: async function(req,res){
        var params = req.query;
        var bud = req.body;
        console.log(params);
        console.log(bud);
        try {
            var ganador = await Reservacion.query().select(
                'reservacion.fecha',
                'reservacion.hora',
                'reservacion.empleado_id',
                'servicio.hora as duracion'
            ).innerJoin('servicio','reservacion.servicio_id','servicio.id')
            .where('reservacion.fecha',params.fechabus)
            .where('reservacion.empleado_id',params.empid);
            if(!ganador) return res.status(404).send({
                message:"en la fecha escogida el empleado no tiene reservaciones o error"
            });
            return res.status(200).send({
                ganador:ganador,
                message:"thumbsUp"
            });
        } catch (error) {
            console.log(error);
        }
    },

    listarEstadosReservas: async function(req,res){
        
        try {
            var listilla = await EstadoReserva.query().select(
                'estado.nombre',
                'estado.descripcion',
                'estado.estado'
            );
            if(!listilla) return res.status(404).send({
                message:"No se econtro nada aqui o error"
            });
            return res.status(200).send({
                listilla:listilla,
                message:"metodo ListaestadosReservas success!"
            });
        } catch (error) {
            console.log(error);
        }
    }
};
module.exports = control_reserva;