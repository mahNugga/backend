'use strict'
const {Knex} = require('Knex');
var Cliente = require('../models/cliente');

var control_cliente = {

    nuevoCliente: async function(req,res){
        var params = req.body;
        console.log(params);
        try {
            var cliente = await Cliente.query().insert({
                nombre: params.nombre,
                apellido: params.apellido,
                correo:params.correo,
                telefono: params.telefono,
                direccion: params.direccion,
                active: 0,
                especial:'',
                estado:1,
                password: params.password
                           
            });
            if(!cliente){
                return res.status(500).send({
                    message:"Error al insertar datos de cliente en la base de datos"});
            }
            return res.status(200).send({
                cliente:cliente,
                message: "metodo nuevoCliente success!"
            });
        } catch (error) {
            
        }        

    },

    listarClientes: async function(req,res){
        try {
            var listaCliente = await Cliente.query().select(
                'cliente.id',
                'cliente.nombre',
                'cliente.apellido',
                'cliente.correo',
                'cliente.telefono',
                'cliente.direccion'
            );
            if(!listaCliente) return res.status(404).send({message:"Cliente no existe"});
            return res.status(200).send({
                listaCliente:listaCliente,
                message: "metodo listar Cliente is a success!"
            });
        } catch (error) {
            
        }

    },

    infoBasicaCabeceras: async function(req,res){
        var params = req.query;
        console.log(req.query);
        try{
            var clienteBasic = await Cliente.query().findById(params.id)
            .select(
                'cliente.nombre',
                'cliente.apellido'
            );
            if(!clienteBasic) return res.status(404).send(
                {messsage:"No se encontro al fulano!"}
            );
            return res.status(200).send({
                clienteBasic:clienteBasic,
                message:"Metodo basico para cab Cliente success!"
            });
        }catch(error){
            console.log(error);
        }
    },

    datosCompletosCliente: async function(req,res){
        var params = req.query;
        try {
            var datosCli = await Cliente.query().select(
                'cliente.nombre',
                'cliente.apellido',
                'cliente.correo',
                'cliente.telefono',
                'cliente.direccion'
            ).where('cliente.id',params.id);
            if(!datosCli) return res.status(404).send({
                message:"No se encontro al cliente"
            });
            return res.status(200).send({
                datosCli:datosCli,
                message:"Metodo datosCompCliente success!"
            });
        } catch (error) {
            console.log(error);
        }
    },

    actualizarRegistroCliente:async function(req,res){
        var params = req.body;
        var quin = req.query;
        console.log(params);
        console.log(quin);
        try {
            var actualito = await Cliente.query().findById(quin.id).patch({
                nombre:params.nombre,
                apellido: params.apellido,
                correo:params.correo,
                telefono:params.telefono,
                direccion:params.direccion
            });
            if(!actualito) return res.status(404).send({
                message:"Error al actualizar datos cliente"
            });
            return res.status(200).send({
                actualito:actualito,
                message:'metodo ActualizaCliente success!'
            });
        } catch (error) {
            console.log(error);
        }
    },

    mantenimientoCliente: async function(req,res){
        var params = req.body;
        try {
            var cambiCli = await Cliente.query().findById(params.id).patch({
                nombre:params.nombre,
                apellido:params.apellido,
                telefono:params.telefono,
                direccion:params.direccion
            });
            if(!cambiCli) return res.status(404).send({
                message:"Error al intentar actualizar Cliente"
            });
            return res.status(200).send({
                cambiCli:cambiCli,
                message:"metodo MantenimientoCliente success!"
            });
        } catch (error) {
            console.log(error);
        }
    }

};

module.exports = control_cliente;