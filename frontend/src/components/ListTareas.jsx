import { actualizarTarea, deleteTarea } from "../acciones"
import { createElement, render, actualizar, createStore } from "../react"

function ListTareas({lista}){
    return(
        <table className="w-full">
            <thead>
                <tr className="  border-b border-gray-200">
                    <th className="p-2  w-20 "></th>
                    <th className="p-2 text-left">Tarea</th>
                    <th className="p-2 " >Estado</th>
                    <th className="p-2" >Acciones</th>
                </tr>

            </thead>
            <tbody>

                {lista.map(tarea=>{
                    return(<tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                        <td className="text-center p-2">
                            <button onclick={()=>actualizarTarea(tarea.id,tarea.completado?{completado:false}:{completado:true})}
                                className="p-1 rounded-full border border-gray-200" >
                                {tarea.completado?"✖":"✔"}
                            </button>
                        </td>
                        <td>{tarea.titulo}</td>
                        <td className={tarea.completado ?
                            "text-green-600 text-center"
                            :
                            "text-amber-600 text-center"}>
                            {tarea.completado?"Completado":"Pendiente"}
                        </td>
                        <td className="text-center">
                            <button onclick={()=>deleteTarea(tarea.id)}
                                className="bg-red-600 px-2 text-white rounded-lg">Borrar</button>
                        </td>
                    </tr>)
                    }
                )}
                            
            </tbody>
        </table>
    )
}
export default ListTareas