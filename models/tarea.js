const { v4: uuidv4 } = require('uuid')


class Tarea {
    constructor( description ){
        this.id = uuidv4();
        this.desc = description;
        this.completadoEn = false;
    }
};

module.exports = {Tarea};