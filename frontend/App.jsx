import { getTareas } from "./src/api"
import ListTareas from "./src/components/ListTareas"
import { createElement, render, actualizar, createStore } from "./src/react"


const tareas = await getTareas()

function App(){
    
    return (

        <section>
            <h1>Tareas</h1>
            <ListTareas lista={tareas} />
        </section>
        
    )
}

export default App