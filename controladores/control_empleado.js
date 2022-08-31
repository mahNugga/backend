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
            console.log(error);
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
                'empleado.id',
                'empleado.nombre',
                'empleado.apellido',
                'empleado.correo',
                'empleado.telefono',
                'empleado.rol'
            ).where('empleado.estado','1');
            if(!listaEmpleado) return res.status(404).send({message:"Empleado no existe"});
            return res.status(200).send({
                listaEmpleado:listaEmpleado,
                message: "metodo listar Empleados  is a success!"
            });
        } catch (error) {
            console.log(error);
        }

    },

    listaSinAdmin: async function(req,res){
        try{
            var listaSinrangos7 = await Empleado.query().select(
                'empleado.id',
                'empleado.nombre',
                'empleado.apellido',
                'empleado.correo',
                'empleado.telefono',
                'empleado.rol'
            ).where('empleado.estado','1').where('empleado.rol','1');
            if(!listaSinrangos7) return res.status(404).send({
                message:"Lista no fue creada"
            });
            return res.status(200).send({
                listaSinrangos7:listaSinrangos7,
                message:"Ahi va tu lista sin Admins"
            });
        }catch(error){
            console.log(error);
        }
    },

    actualizaEmpleado: async function(req,res){
        var params = req.body;
        var rol  = params.rol;
        var roldb;
        if(rol=='empleado'){roldb=1}
        if(rol=='administrador'){roldb=7}
        //console.log(params.id);
        //console.log(params);
        //console.log(roldb);
        try{
            var editado = await Empleado.query().findById(params.id).patch({
                nombre: params.nombre,
                apellido: params.apellido,
                correo:params.correo,
                password: params.password,
                telefono: params.telefono,
                direccion: params.direccion,
                rol: roldb
            });
            if(!editado){
                return res.status(500).send({
                    message:"Error al actualizar empleado"
                });
            }
            return res.status(200).send({
                editado:editado,
                message:"Empleado Editado success!"
            });
        }catch(error){
            console.log(error);
        }
    },

    borrarEmpleado: function(req,res){
        
    },

    softBorradoEmpleado: async function(req,res){
        var params = req.body;
        try{
            var softBorrar = await Empleado.query().findById(params.id)
            .patch({
                estado:0
            });
            if(!softBorrar){
                return res.status(500).send({
                    message:" Error al softEliminar empleado!"
                });
            }
            return res.status(200).send({
                softBorrar:softBorrar,
                message:"SoftBorradoEmpleado success!"
            });
        }catch(error){

        }
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
        
    },

    credencialesCabEmpleado: async function(req,res){
        var params = req.query;
        try{
            var empeladoCab = await Empleado.query().findById(params.id)
            .select(
                'empleado.id',
                'empleado.nombre',
                'empleado.apellido'
            );
            if(!empeladoCab) return res.status(404).send({
                message:"Empleado no ta qui"
            });
            return res.status(200).send({
                empeladoCab:empeladoCab,
                message:"Metodo credenciales empleado cab success!"
            });
        }catch(error){
            console.log("El end: "+error);
        }
    },

    sudolistarEmpleados: async function(req,res){
        try {
            var listaEmpleado = await Empleado.query().select(
                'empleado.id',
                'empleado.nombre',
                'empleado.apellido',
                'empleado.correo',
                'empleado.telefono',
                'empleado.rol',
                'empleado.estado'
            );
            if(!listaEmpleado) return res.status(404).send({message:"Empleado no existe"});
            return res.status(200).send({
                listaEmpleado:listaEmpleado,
                message: "metodo listar Empleados  is a success!"
            });
        } catch (error) {
            console.log(error);
        }

    }

};

module.exports = control_empleado;