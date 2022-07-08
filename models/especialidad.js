const { Model } = require('objection');

class Especialidad extends Model{
    static get tableName(){
        return 'especialidad';
    };
    static get nombreColumn(){
        return 'nombre';
    }
    static get descripcionColumn(){
        return 'descripcion';
    }
    static get estadoColumn(){
        return 'estado';
    }
};

module.exports = Especialidad;


