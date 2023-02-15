const { Tarea } = require('./tarea');
const colors = require('colors')

class Tareas {
    constructor() {
        this._listado = {}
    }

    create( description = '' ) {
        const tarea = new Tarea(description)
        this._listado[tarea.id] = tarea
    }

    uploadTasksFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        });
    }

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => listado.push(this._listado[key]))
        return listado;
    }

    list() {
        this.listadoArr.forEach((task, i) => {

            const idx = `${i + 1}`.green;
            const {desc, completadoEn }  = task;
            const estado = ( completadoEn ) ? 'completada'.green : 'pendiente'.red
            
            console.log(`${idx} ${desc} :: ${estado}`);
        })
    }
    
    pendingOrCompleteTasks(completadas = true) {
        if(completadas) {
            const tasks = this.listadoArr.filter(task => task.completadoEn === true);
            tasks.forEach((task, i) => {
                const idx = `${i + 1}`.green;
                const {desc, completadoEn} = task;
                const estado = 'Completada'.green;

                console.log(`${idx} ${desc} :: ${estado}`)
            })
        }else{
            const tasks = this.listadoArr.filter(task => task.completadoEn === false);
            tasks.forEach((task, i) => {
                const idx = `${i + 1}`.green;
                const {desc, completadoEn} = task;
                const estado = 'Pendiente'.red;

                console.log(`${idx} ${desc} :: ${estado}`)
            })
        }
    }

    deleteTask(id) {
        if(this._listado[[id]]) {
            delete this._listado[id];
            console.log('Tarea eliminada de forma exitosa')
        }
    }

    completeTasks(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = true
            }
        })

        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id)) this._listado[tarea.id].completadoEn = false
        })
    }
}

module.exports = {Tareas};