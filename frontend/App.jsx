import ListTareas from "./src/components/ListTareas"
import TaskForm from "./src/components/TaskFrom"
import { createElement, render, actualizar, createStore } from "./src/react"
import { store } from "./src/store"



function App(){
    
    const estado = store.getState()
    const tareas=estado.tareas
    console.log(tareas)
    return (

        <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-10">Tareas</h1>
            <TaskForm />
            <ListTareas lista={tareas} />
            {estado.cargando?<p className="mt-4 text-sm ">Cargando...</p>:""}
            {estado.error?<p className="mt-4 text-sm ">Error: {estado.error}</p>:""}
        </section>
        
    )
}

export default App