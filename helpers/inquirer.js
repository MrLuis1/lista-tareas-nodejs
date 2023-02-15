const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {value: 1, name: `${"1".red}. Crear tarea`},
            {value: 2, name: `${"2".red}. Lista de tareas`},
            {value: 3, name: `${"3".red}. Tareas completadas`},
            {value: 4, name: `${"4".red}. Tareas pendientes`},
            {value: 5, name: `${"5".red}. Completar tarea(s)`},
            {value: 6, name: `${"6".red}. Borrar tarea`},
            {value: 0, name: `${"0".red}. Salir \n`},
        ]
    }
];

const inquirerMenu = async() => {
    console.clear();

    console.log('======================'.green);
    console.log('Seleccione una opción'.green);
    console.log('======================\n'.green);

    const { opcion } = await inquirer.prompt(questions);
    return opcion;
};

const pause = async() => {
    const pauseQuestion = [
        {
            type: 'input',
            name: 'pause',
            message: `\nPresione ${'ENTER'.green} para continuar\n`,
        },
    ];
    await inquirer.prompt(pauseQuestion);
    return;
};

const readInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if(value.length === 0) {
                    return `Debe ingresar un valor`
                } return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
};

const showListForDelete = async(tasks = []) => {
    const arrayTasks = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    });

    arrayTasks.unshift({
        value: 0,
        name: `${'0.'.green} Cancelar`
    });

    const deleteOptions = [
        {
            type: 'list',
            name: 'id',
            message: '¿Qué tarea desea eliminar?',
            choices: arrayTasks
        }
    ];
    const { id } = await inquirer.prompt(deleteOptions);
    return id;
}

const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}


const taskToComplete = async(tasks = []) => {
    const arrayTasks = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completadoEn) ? true : false
        }
    });
    const options = [
        {
            type: 'checkbox',
            name: 'ids',
            message: '¿Qué tarea desea completar?',
            choices: arrayTasks
        }
    ];
    const { ids } = await inquirer.prompt(options);
    return ids;
}

module.exports = {
    pause,
    readInput,
    inquirerMenu,
    showListForDelete,
    confirm,
    taskToComplete
}