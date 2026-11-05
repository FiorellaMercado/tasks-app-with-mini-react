const {db,taskResponse, tasksResponse}= require('../config/db')

const getAll= (req, res) =>{
    const tareas= db.prepare('SELECT * FROM tareas ORDER BY id').all()
    res.status(200).json(tasksResponse(tareas))
}

const getTaskById= (req,res)=>{
    const id = Number(req.params.id)

    if(!id || !Number.isInteger(id)){
        return res.status(400).json({error:"id invalido"})
    }

    const tarea =  db.prepare('SELECT * FROM tareas WHERE id = ?').get(id)
    if(!tarea){
        return res.status(404).json({error:"tarea no encontrada"})       
    }

    res.status(200).json(taskResponse(tarea))
}

const createTask=(req,res)=>{

    const body= req.body

    if(!body){
        return res.status(400).json({error:"sin body"})

    }

    if(body.titulo == null){
        return res.status(400).json({error:"clave invalida"})
    }

    const titulo= body.titulo

    if (typeof titulo !=="string"  || titulo.trim()===""){
        return res.status(400).json({error:"titulo invalido"})

    }

    const tarea = db.prepare('INSERT INTO tareas (titulo) VALUES (?) RETURNING *').get(titulo.trim())
    res.status(201).json(taskResponse(tarea))

}

const updateTask = (req,res)=>{

    const id = Number(req.params.id)

    if(!id || !Number.isInteger(id)){
        return res.status(400).json({error:"id invalido"})
    }

    const tarea =  db.prepare('SELECT * FROM tareas WHERE id = ?').get(id)
    if(!tarea){
        return res.status(404).json({error:"tarea no encontrada"})       
    }

    const body = req.body
    if(!body){
        return res.status(400).json({error:"sin body"})
    }
    if(body.titulo==null && body.completado==null){
        return res.status(400).json({error:"body invalido"})      
    }
    const parametros={ query:[], get:[]}
    const consulta={}
    const titulo = body.titulo
    let completado= body.completado


    if(titulo!=null){
        if(typeof titulo !== "string" || titulo.trim()===""){
            return res.status(400).json({error:"titulo invalido"})      
        }
        parametros.query.push("titulo = ?")
        parametros.get.push(titulo.trim())
    }

    if(completado!= null){
        if(typeof completado !== "boolean" ){
            return res.status(400).json({error:"valor completado invalido"})      
        }
        parametros.query.push("completado = ?")
        parametros.get.push(completado?1:0)
    }
    consulta['query']=parametros.query.join(', ')


    const tareaActualizada = db.prepare(`UPDATE tareas SET ${consulta.query}  WHERE id = ? RETURNING *`).get(...parametros.get, id)

    res.status(200).json(taskResponse(tareaActualizada))

}

const deleteTask = (req,res)=> {

    const id = Number(req.params.id)

    if(!id || !Number.isInteger(id)){
        return res.status(400).json({error:"id invalido"})
    }

    const tarea =  db.prepare('SELECT * FROM tareas WHERE id = ?').get(id)
    if(!tarea){
        return res.status(404).json({error:"tarea no encontrada"})       
    }

    const tareaEliminada = db.prepare('DELETE FROM tareas WHERE id = ? RETURNING *').get(id)
    res.status(200).json(taskResponse(tareaEliminada))
}

module.exports={getAll, createTask, getTaskById, updateTask, deleteTask}