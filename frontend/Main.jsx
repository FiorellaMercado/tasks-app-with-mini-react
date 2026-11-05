import App from "./App"
import { createElement, render, actualizar, createStore } from "./src/react"


const app = document.getElementById('app')
render(App(), app)