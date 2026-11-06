import { crearTareas } from "../acciones";
import { createElement, render, actualizar, createStore } from "../react"
import { store } from "../store"

function TaskForm({}){
    console.log("TaskForm se está renderizando");
    async function enviarTarea(e){
        e.preventDefault()
        const titulo= e.target.nuevo.value;
        if(titulo.trim()===""){
            return
        }
        console.log(titulo)
        await crearTareas({titulo:titulo})
        e.target.reset()
    }
    return(
        <form onsubmit={e=>enviarTarea(e)} className="flex items-center gap-2 mb-10">
            <label htmlFor="nuevo" className="text-sm font-bold">Nueva Tarea: </label>
            <input id="nuevo" name="nuevo" type="text"
             className=" border border-gray-200 rounded-lg px-2" />
            <button type="submit" className="px-2 bg-indigo-500 rounded-lg text-white">Crear</button>
        </form>

    )
}
export default TaskForm