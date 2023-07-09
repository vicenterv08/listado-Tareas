const Tarea = require("./tarea");
require('colors');
/**
 * _listado: 
 *      { 'uuid-3445-455464-453: {id:12, desc: asdas,completadoEN:13/04/2022}'    }
 */

class Tareas{
    _listado = {};

    get listadoArr (){
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        } );
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id]; 
        }
    }

    cargarTareasFromArray(tareas = [ ]){
        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        // console.log(this._listado);//objeto
        // console.log(this.listadoArr);//arreglo
        console.log("\n");
        this.listadoArr.forEach(({desc,completado},indice) => {
            const idx = `${indice + 1}`.green;
            const estado = (completado)
            ? `COMPLETADA`.green
            : 'PENDIENTE'.red;
            console.log(`${idx + '.'.green} ${desc} :: ${estado}`);
            
        });
        //1. Alma :: COMPLETADA | PENDIENTE
    }
    
    listarPendientesCompletadas(completadas = true){
        console.log("\n");
        let idx = 0;
        this.listadoArr.forEach(({desc, completado}) => {
            const estado = (completado)
                ? `COMPLETADA`.green
                : 'PENDIENTE'.red;
        if(completadas){
            if(completado){
                idx+=1;
                console.log(`${(idx + '.').green} ${desc} :: ${completado.green}`);
            }
        }else{
            if(!completado){
                idx++;
                console.log(`${(idx + '.').green} ${desc} :: ${estado}`);
            }
        }
        });
    }

    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completado){
                tarea.completado = new Date().toISOString();
            }
        });
        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completado = null;
            } 
        }) 
    }

}
module.exports = Tareas;
