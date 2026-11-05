const express = require('express')
const router = express.Router()
const tarea= require('../controllers/tareaController')

router.get('/',tarea.getAll)
router.post('/', tarea.createTask)
router.get('/:id', tarea.getTaskById)
router.patch('/:id', tarea.updateTask)
router.delete('/:id', tarea.deleteTask)



module.exports=router