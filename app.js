'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

var app = express();

//cargar solicitudes de ruta
var ruta_empleado = require('./rutas/ruta_empleado');

//middleware

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(fileUpload());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas 
/* app.get('/',(req,res) => {
    res.status(200).send(
         "<h2>Yarghhh como un huracan</h2>"
    );
});

app.get('/test',(req,res) =>{
    res.status(200).send({
        message: "hola desde mi api de Nodejs, viento en popa piratas!"
    });
}); */

app.use('/api',ruta_empleado);
//exportar

module.exports = app;

