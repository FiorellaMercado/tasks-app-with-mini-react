const express =  require('express')
const cors = require('cors')

const tareaRoutes= require('./routes/tareaRoutes')

const app = express()


app.use(express.json())
app.use(cors())




app.use('/api/tareas',tareaRoutes)

const PORT=3000
app.listen(PORT, ()=>{
    console.log(`Servidor en: http://localhost:${PORT}`)
})