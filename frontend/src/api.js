const API_URL= "http://localhost:3000/api"

const apiGET= async(ruta)=>{
    const respuesta = await fetch(`${API_URL}/${ruta}`)
    if(!respuesta.ok){
        throw new Error('La API respondio con error '+respuesta.status)
    }
    const datos= await respuesta.json()
    return datos
}

async function apiRequest(ruta, metodo, datos){
    const respuesta = await fetch(`${API_URL}/${ruta}`, {
        method:metodo,
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(datos)
    })
    if(!respuesta.ok){
        throw new Error('La API respondio con error '+respuesta.status)
    }
    const contenido = await respuesta.json()
    return contenido
}



export async function getTareas(){
    const links = await apiGET('tareas')
    return links

}


export async function createTask(titulo){

    const tarea = await apiRequest(`tareas`, 'POST', {titulo:titulo})
    return tarea

}