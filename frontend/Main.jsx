import App from "./App"
import { cargarTareas } from "./src/acciones"
import { createElement, render, actualizar, createStore } from "./src/react"
import { store } from "./src/store"


const app = document.getElementById('app')
function pintar(){
    render(App(), app)
}

store.subscribe(pintar)

pintar()

cargarTareas()
