import { createStore } from "./react";

const estadoInicial = {tareas: [], cargando:true, error:null}

function reducer(estado, accion){
    if(accion.type === 'TAREAS_CARGADAS'){
        if(accion.error){
            return {...estado, error:accion.error, cargando:false}
 
        }
        return {...estado, tareas:accion.payload, cargando:false}
    }
    if(accion.type==='TAREA_AGREGADA'){
        return{...estado, tareas: [...estado.tareas,accion.payload] }
    }
    if(accion.type==='TAREA_ELIMINADA'){
        return{...estado, tareas: estado.tareas.filter(tarea=>tarea.id !== accion.payload)}
    }
    if(accion.type==='TAREA_ACTUALIZADA'){

        const nuevaLista=estado.tareas.map(tarea=>tarea.id===accion.payload.id?accion.payload:tarea)
        console.log(nuevaLista)
        return{...estado, tareas: nuevaLista}
    }
    return estado
}

export const store=createStore(reducer,estadoInicial)
