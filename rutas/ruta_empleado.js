'use strict'

var express = require('express');
var controlador_empleado = require('../controladores/control_empleado');
var controlador_insumo = require('../controladores/control_insumo');
var controlador_cliente = require('../controladores/control_cliente');
var controlador_especialidad = require('../controladores/control_especialidad');
var controlador_servicio = require('../controladores/control_servicio');
var controlador_ingreso = require('../controladores/control_ingreso');

var ruta = express.Router();



ruta.get('/home',controlador_empleado.home);
ruta.post('/test',controlador_empleado.test);
ruta.post('/nuevo-empleado',controlador_empleado.nuevoEmpleado);
ruta.get('/consulta-empleado',controlador_empleado.seleccionaEmpleado);
ruta.get('/lista-empleado',controlador_empleado.listarEmpleados);
ruta.post('/editar-imagen',controlador_empleado.subirImagen);
ruta.post('/nuevo-insumo',controlador_insumo.nuevoInsumo);
ruta.get('/consulta-insumo',controlador_insumo.listarInsumos);
ruta.post('/nueva-especialidad',controlador_especialidad.nuevaEspecialidad);
ruta.get('/consulta-especialidad',controlador_especialidad.listarEspecialidades);
ruta.post('/nuevo-servicio',controlador_servicio.nuevoServicio);
ruta.get('/consulta-servicio',controlador_servicio.listarServicios);

ruta.post('/nuevo-cliente',controlador_cliente.nuevoCliente);
ruta.get('/consulta-cliente',controlador_cliente.listarClientes);

ruta.get('/ingreso',controlador_ingreso.login);

ruta.post('/imagen',controlador_empleado.subirImagen2);
module.exports = ruta;