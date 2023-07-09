const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoBorrarTareas,
        confirmar,
        mostrarListadoCheckList
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
// import { inquirerMenu } from './helpers/inquirer.js'
require('colors')
// import colors from 'colors'
console.clear()

const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if(tareasDB){
      //cargar tareas
      tareas.cargarTareasFromArray(tareasDB);
    }
    do {
      opt =  await inquirerMenu();
      switch (opt) {
        case '1': 
           const desc = await leerInput('Descripcion:');
           tareas.crearTarea(desc);
        break;
        case '2':
          tareas.listadoCompleto();
          // console.log(tareas.listadoArr);
        break;
        case '3': //listar completadas
          tareas.listarPendientesCompletadas(true);
        break;
        case '4': //listar pendientes
          tareas.listarPendientesCompletadas(false);
        break;
        case '5': // completado | pendiente
          const ids = await mostrarListadoCheckList(tareas.listadoArr);
          if(ids == 1) console.log('No hay tareas'.red);
          else{
            tareas.toggleCompletadas(ids);
          }
        break;
        case '6': //borrar
          const id = await listadoBorrarTareas(tareas.listadoArr);
          if(id==1){
            console.log('\nNo hay tareas para borrar'.red);
          }
          if(id!='0' && id!=1){
            const ok = await confirmar('¿Esta seguro de borrar la tarea?');
            // console.log({ok});
            if(ok){
              tareas.borrarTarea(id)
              console.log('\nTarea borrada'.blue);
            }
          }
        break;
      }
      //podemos guardar como arreglo o como el objeto _listado o listadoArr
      //tareas.listadoArr regresa un arreglo
      guardarDB(tareas.listadoArr);

      await pausa();  
     
    }while( opt !== '0')
}


main();