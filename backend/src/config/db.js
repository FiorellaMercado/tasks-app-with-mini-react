const Database = require('better-sqlite3')


const db = new Database('tareas.db')
db.exec(`CREATE TABLE IF NOT EXISTS tareas(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    completado INTEGER NOT NULL DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP)`
)

const tasksResponse=(tareas)=>{
    const tasks= tareas.map(
        tarea => ( 
            {...tarea, completado:Boolean(tarea.completado)}
        ) 
    )
    return tasks

}
const taskResponse=(tarea)=>{
    const task= {...tarea,  completado:Boolean(tarea.completado)}
    return task
}

module.exports={db, tasksResponse, taskResponse}