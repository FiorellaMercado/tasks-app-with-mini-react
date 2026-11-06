import { store } from "./store"
import { createTask, getTareas, deleteTask, updateTask } from "./api"

export async function cargarTareas() {
  try {
    const tareas = await getTareas()
    store.dispatch({ type: "TAREAS_CARGADAS", payload: tareas })
  } catch (e) {
    console.log(e)
    store.dispatch({ type: "TAREAS_CARGADAS", error: e.message})

  }
}

export async function crearTareas(dato) {
  try {
    console.log(dato)
    const tarea= await createTask(dato)
    store.dispatch({ type: "TAREA_AGREGADA", payload:tarea, enviando: true })
  } catch (e) {
    console.log(e)
    store.dispatch({ type: "TAREA_AGREGADA", error: e.message, enviando: false})

  }
}

export async function deleteTarea(id) {
  try {
    console.log(id)
    const tarea= await deleteTask(id)
    store.dispatch({ type: "TAREA_ELIMINADA", payload:id, eliminando: true })
  } catch (e) {
    console.log(e)
    store.dispatch({ type: "TAREA_ELIMINADA", error: e.message, eliminando: false})

  }
}

export async function actualizarTarea(id, datos) {
  try {
    console.log(id,datos)
    const tarea= await updateTask(id, datos)
    store.dispatch({ type: "TAREA_ACTUALIZADA", payload:tarea, modificando: true })
  } catch (e) {
    console.log(e)
    store.dispatch({ type: "TAREA_ACTUALIZADA", error: e.message, modificando: false})

  }
}