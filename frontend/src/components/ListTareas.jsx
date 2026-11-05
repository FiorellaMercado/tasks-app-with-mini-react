import { createElement, render, actualizar, createStore } from "../react"

function ListTareas({lista}){
    return(
        <div>
            {lista.map(tarea=>{
                return(<div>
                    <p>{tarea.titulo}</p>
                    <p className={tarea.completado?"completado":"pendiente"}>{tarea.completado?"Completado":"Pendiente"}</p>
                    <span>-</span>
                </div>)
                }
            )}
        </div>
    )
}
export default ListTareas