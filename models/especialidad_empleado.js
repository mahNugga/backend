const { Model } = require('objection');

class Especialidad_Empleado extends Model{
    static get tableName(){
        return 'especialidad_empleado';
    }
    static get empleadoidColumn(){
        return 'empleado_id';
    }
    static get especialidadidColumn(){
        return 'especialidad_id';
    }
};

module.exports = Especialidad_Empleado;