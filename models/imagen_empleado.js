const { Model } = require('objection');
const { modelPaths } = require('./especialidad_empleado');

class Imagen_empleado extends Model{
    static get tableName(){
        return 'imagen_empleado';
    }
    static get imagen(){
        return 'imagen';
    }
    static get empleadoidColumn(){
        return 'empleado_id';
    }
};

module.exports = Imagen_empleado;