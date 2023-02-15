require('colors');

const showMenu = () => {
    return new Promise((resolve) => {
        console.clear();
    
        console.log('======================'.green);
        console.log('Seleccione una opción'.green);
        console.log('======================\n'.green);
    
        console.log(`${ '1.'.green } Crear tarea`);
        console.log(`${ '2.'.green } Lista de tareas`);
        console.log(`${ '3.'.green } Tareas completadas`);
        console.log(`${ '4.'.green } Tareas pendientes`);
        console.log(`${ '5.'.green } Completar tarea(s)`);
        console.log(`${ '6.'.green } Borrar tarea`);
        console.log(`${ '0.'.green } Salir \n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Seleccione una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        })
    })
}

const pause = () => {
    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, () => {
            readline.close();
            resolve();
        })
    })
}

module.exports = {
    showMenu,
    pause
}