const { Model } = require('objection');

class Image extends Model{
    static get tableName(){
        return 'image';
    }
    static get imagenColumn(){
        return 'image';
    }
    static get empleadoidColumn(){
        return 'empleado_id';
    }
};
//not in final
module.exports = Image;