'use strict'
const {Knex} =require('Knex');
var Cliente = require('../models/cliente');
var Empleado = require('../models/empleado');

var control_ingreso = {

    login:async function(req,res){
        var params = req.body;
        var datos = req.query;
        console.log(params);
        console.log('--------------------------');
        console.log(req.query.correo);
        var toller;
        var teller;
        try{
            var usuario_c = await Cliente.query().select(
                'cliente.id',
                'cliente.nombre',
                'cliente.apellido',
                'cliente.correo',
                'cliente.password'
            ).where('cliente.correo',datos.correo)
            .where('cliente.password',datos.password);
            console.log("lo que sale de la query: ");
            console.log(usuario_c);
            if(usuario_c==''){

                var empleado_r = await Empleado.query().select(
                    'empleado.id',
                    'empleado.nombre',
                    'empleado.apellido',
                    'empleado.rol',
                    'empleado.correo',
                    'empleado.password'
                ).where('empleado.correo',datos.correo)
                .where('empleado.password',datos.password);
                if(empleado_r!=''){
                    return res.status(200).send(
                        {
                            empleado_r:empleado_r,
                            toller:'chingado rol',
                            teller:empleado_r[0].rol,
                            message:"Es empleado!"
                        }
                    );
                }else{
                    return res.status(404).send(
                        {
                            teller:6,
                            message:'No hay bolo flaco,registrate!'
                        }
                    );
                }
            }
            if(usuario_c!=''){
                return res.status(200).send(
                    {
                        usuario_c:usuario_c,
                        teller:5,
                        message:"Es un usuario!"
                    }
                );
            }
            
        }catch(error){
            console.log("el error:"+error);
        }
    }

};

module.exports = control_ingreso;