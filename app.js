
const { inquirerMenu, pause, readInput, showListForDelete, confirm, taskToComplete } = require('./helpers/inquirer');
const { saveFile, readDB } = require('./helpers/saveFile');
const { Tareas } = require('./models/tareas');

const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();
    const DB = readDB()

    if( DB ){ // Establecer tareas
        tareas.uploadTasksFromArray(DB)
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // crear tarea
                const desc = await readInput('descripcion =>>');
                tareas.create(desc);
            break;
            case 2:
                // lista de tareas
                tareas.list();
            break;
            case 3:
                // tareas completadas
                tareas.pendingOrCompleteTasks(true);
            break;
            case 4:
                // tareas pendientes
                tareas.pendingOrCompleteTasks(false);
            break;
            case 5:
                // completado de tareas
                const ids = await taskToComplete(tareas.listadoArr);
                tareas.completeTasks(ids)
            break;
            case 6:
                // borrar tareas
                const id = await showListForDelete( tareas.listadoArr );
                if(id !== 0){
                    const ok = await confirm('¿Está seguro de que desea eliminar este registro?')
                    if(ok) tareas.deleteTask(id)
                }
            break;

        }

        saveFile(tareas.listadoArr);

        if(opt !== 0) await pause();
    } while ( opt !== 0 );
    
}

main();