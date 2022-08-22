'use strict'

var express = require('express');
var controlador_empleado = require('../controladores/control_empleado');
var controlador_insumo = require('../controladores/control_insumo');
var controlador_cliente = require('../controladores/control_cliente');
var controlador_especialidad = require('../controladores/control_especialidad');
var controlador_servicio = require('../controladores/control_servicio');
var controlador_ingreso = require('../controladores/control_ingreso');
var control_horario = require('../controladores/control_horario');
var la_reserva = require('../controladores/control_reservacion');

var ruta = express.Router();



ruta.get('/home',controlador_empleado.home);
ruta.post('/test',controlador_empleado.test);
ruta.post('/nuevo-empleado',controlador_empleado.nuevoEmpleado);
ruta.get('/consulta-empleado',controlador_empleado.seleccionaEmpleado);
ruta.put('/edita-empleado',controlador_empleado.actualizaEmpleado);
ruta.put('/elimina-empleado',controlador_empleado.softBorradoEmpleado);
ruta.get('/lista-empleado',controlador_empleado.listarEmpleados);
ruta.get('/lista-empleado-gen',controlador_empleado.listaSinAdmin);
ruta.post('/editar-imagen',controlador_empleado.subirImagen);
ruta.post('/nuevo-insumo',controlador_insumo.nuevoInsumo);
ruta.get('/consulta-insumo',controlador_insumo.listarInsumos);
ruta.post('/nueva-especialidad',controlador_especialidad.nuevaEspecialidad);
ruta.get('/consulta-especialidad',controlador_especialidad.listarEspecialidades);
ruta.post('/nuevo-servicio',controlador_servicio.nuevoServicio);
ruta.get('/consulta-servicio',controlador_servicio.listarServicios);
ruta.post('/nuevo-horario',control_horario.nuevoHorario);
ruta.get('/cliente-basicinfo',controlador_cliente.infoBasicaCabeceras);
ruta.get('/verifica-fechas',control_horario.devolverFechas);

ruta.post('/nuevo-cliente',controlador_cliente.nuevoCliente);
ruta.get('/consulta-cliente',controlador_cliente.listarClientes);

ruta.get('/ingreso',controlador_ingreso.login);

ruta.post('/imagen',controlador_empleado.subirImagen2);

ruta.post('/reservar',la_reserva.nuevaReservacion);
ruta.get('/consulta-reservacioncliente',la_reserva.muestraClientere);
module.exports = ruta;