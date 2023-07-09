//vamos a sacar la funcion v4
//renombramos como uuidv4
const { v4: uuidv4 } = require('uuid');

class Tarea{
    //inicializamos
    id = '';
    desc = '';
    completado = null;

    constructor(desc){
        this.id = uuidv4();
        this.desc = desc;
        this.completado = null;
    }

}

module.exports = Tarea;
//para no hacer desestructuracion exportamos por defecto
//si lo pusieramos entre llaves tendriamos que desestructurar en el app.js