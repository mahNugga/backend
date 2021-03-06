'use strict'
const { Knex } = require('knex');
var Empleado = require('../models/empleado');
var Imagen_empleado = require('../models/imagen_empleado');
var Image = require('../models/image');
//const { param } = require('../rutas/ruta_empleado');
var control_empleado = {
    home: function(req, res){
        return res.status(200).send({
            message: "Soy la home"
        });
    },
    test: function(req,res){
        return res.status(200).send({
            message: "Soy el controlador test"
        });
    },

    nuevoEmpleado: async function(req,res){
        //var empleado = new Empleado();

        var params = req.body;
        //console.log(params.rol);
        var rol = params.rol;
        var roldb;
        if(rol=="empleado1"){ roldb=1}
        if(rol=="administrador"){roldb=7}
        console.log(rol);
        try {
            var empleado = await Empleado.query().insert({
                nombre: params.nombre,
                apellido: params.apellido,
                correo:params.correo,
                password: params.password,
                telefono: params.telefono,
                direccion: params.direccion,
                rol: roldb,
                fecha_creacion: params.fecha_creacion,
                estado: 1           
            });
            if(!empleado){
                return res.status(500).send({
                    message:"Error al insertar datos de empleado en la base de datos"});
            }
            return res.status(200).send({
                empleado:empleado,
                message: "metodo nuevoEmpleado success!"
            });
        } catch (error) {
            
        }        
    },

    seleccionaEmpleado: async function(req,res){
        var busqueda = req.params;

        try {
            var buscaEmpleado = await Empleado.query().select(
                'empleado.nombre',
                'empleado.apellido',
                'empleado.correo'
            ).where('empleado.apellido',params.apellido);
            if(!buscaEmpleado) return res.status(404).send({message:"Empleado no existe"});
            return res.status(200).send({
                buscaEmpleado:buscaEmpleado,
                message: "metodo seleccionaEmpleado success!"
            });
        } catch (error) {
            
        }

    },

    listarEmpleados: async function(req,res){
        try {
            var listaEmpleado = await Empleado.query().select(
                'empleado.nombre',
                'empleado.apellido',
                'empleado.correo'
            );
            if(!listaEmpleado) return res.status(404).send({message:"Empleado no existe"});
            return res.status(200).send({
                listaEmpleado:listaEmpleado,
                message: "metodo listar Empleados  is a success!"
            });
        } catch (error) {
            
        }

    },

    actualizaEmpleado: function(req,res){

    },

    borrarEmpleado: function(req,res){

    },

    subirImagen: async function(req,res){
        var empleadoid = req.params.id;
        var fig = req.files;
        var data = req.files.imagen.data;
        //console.log(req.files);
        //console.log(fig);
        if(data){
            await Imagen_empleado.query().insert({imagen:data,
                empleado_id:4})
            .then(()=>{
                res.status(200).send({
                    message:"Imagen guardada en base de datos!"
                });
            })
            .catch( err=>{
                res.send('404'+err.stack);
            });
            
        }
        //return res.status(404).send({message:"Error General"});
    },

    subirImagen2: async function(req,res){
        
    }

};

module.exports = control_empleado;