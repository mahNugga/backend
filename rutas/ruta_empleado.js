'use strict'

var express = require('express');
var controlador_empleado = require('../controladores/control_empleado');
var controlador_insumo = require('../controladores/control_insumo');

var ruta = express.Router();



ruta.get('/home',controlador_empleado.home);
ruta.post('/test',controlador_empleado.test);
ruta.post('/nuevo-empleado',controlador_empleado.nuevoEmpleado);
ruta.get('/consulta-empleado',controlador_empleado.seleccionaEmpleado);
ruta.get('/lista-empleado',controlador_empleado.listarEmpleados);
ruta.post('/editar-imagen',controlador_empleado.subirImagen);
ruta.post('/nuevo-insumo',controlador_insumo.nuevoInsumo);
ruta.get('/consulta-insumo',controlador_insumo.listarInsumos);

ruta.post('/imagen',controlador_empleado.subirImagen2);
module.exports = ruta;