// creamos un objeto a partir del tipo, atributos y sus hijos 
export function createElement(type,props,...children){
    const objeto={
        type:type,
        props: props || {},
        children: children.flat()
    }
    return objeto
}

// funcion render, actualiza el contenedor 
let arbolViejo = null
export function render(nuevo, contenedor){ 
    const arbol=expandir(nuevo)
    actualizar(contenedor, arbol, arbolViejo, 0)
    arbolViejo=arbol
}

//es el diff ve si hay diferencia y lo cambia
function cambio(nodoA, nodoB){
    //son nulos?
    if(nodoA==null || nodoB== null){
        if(nodoA == null && nodoB == null){  // == null da true cuando es null o undefined
            return false
        }else{
            return true
        }

    }
    //UNO DE ELLOS ES objeto?
    if(typeof nodoA === "object" || typeof nodoB === "object"){
        //son objetos distintos
        if(typeof nodoA !== typeof nodoB){
            return true
        }
    }
    //uno de ellos es  numero o texto?
    if((typeof nodoA === "string" || typeof nodoA === "number" )&& (typeof nodoB === "string" || typeof nodoB === "number")){
        //son textos iguales?
        if(String(nodoA)!== String(nodoB)){
            return true
        }
    }
    //SON OBJETOS AMBOS?
    if(typeof nodoA === "object" && typeof nodoB === "object"){
        if(nodoA.type !== nodoB.type){
            return true
        }
    }
    return false
}

//CREA el nodo
function crearNodo(elementoVirtual){
    //es numero o texto?
    if(typeof elementoVirtual === "string" || typeof elementoVirtual === "number"){
        const nodoTexto = document.createTextNode(elementoVirtual)
        return nodoTexto
    }
    //es una funcion? <App/>
    if(typeof elementoVirtual.type === "function"){
        const resultado= elementoVirtual.type({...elementoVirtual.props, children : elementoVirtual.children})
        return crearNodo(resultado)
    }
    //por cada atributo agregar al nodo
    const nodo=document.createElement(elementoVirtual.type)
    for(const atributo in elementoVirtual.props){
        nodo[atributo]=elementoVirtual.props[atributo]
    }
    //crear nodo por cada hijo / recursividad
    for(const hijo of elementoVirtual.children){
        nodo.appendChild(crearNodo(hijo))
    }
    return nodo
}

//crea el onjeto completo expandido
function expandir(elemento){
    //es texto numero o  null?
    if(typeof elemento === "string" || typeof elemento === "number" || elemento == null){
        return elemento
    }
    //es una funcion? la vuelve a expandir 
    if(typeof elemento.type === "function"){
        const resultado= elemento.type({...elemento.props, children : elemento.children})
        return expandir(resultado)
    }
    //por cada hijo expandir 
    const hijosExpandidos= elemento.children.map(hijo=> expandir(hijo))
    //se devuelve el arbol completo
    return {...elemento, children: hijosExpandidos}

}
//funcion interna de render
export function actualizar(padre,nuevo,viejo, indice ){
    const nodoReal=padre.childNodes[indice]
    //no hay viejo
    if(viejo == null){
        padre.appendChild(crearNodo(nuevo))
        return
    }
    //no hay nuevo remueve lo que habia
    if(nuevo == null){
        padre.removeChild(nodoReal)
        return
    }
    //hay cambio entre nuevo y viejo? se reemplaza
    if(cambio(nuevo,viejo)){
        padre.replaceChild(crearNodo(nuevo), nodoReal)
        return 
    }
    //es letra o numero y no cambio ? no hacer nada
    if (typeof nuevo === "string" || typeof nuevo === "number") {
        return   // caso particular
    }
    //por cada atributo lo cambia al nuevo nodo
    for(const atributo in nuevo.props){
        nodoReal[atributo]=nuevo.props[atributo]
    }
    //por cada hijo lo agrega al nodo
    for (let i = 0; i < nuevo.children.length; i++) {
        actualizar(nodoReal, nuevo.children[i], viejo.children[i], i)
    }
    //saca los nodos que ya no hay respecto al viejo
    for (let i = viejo.children.length - 1; i >= nuevo.children.length; i--) {
        nodoReal.removeChild(nodoReal.childNodes[i])
    }
    
}

//funcion que crea el store flux
export function createStore(reducer, estadoInicial){
    let estado = estadoInicial
    const suscriptores= []
    //permite ver el estado
    function getState(){
        return estado
    }
    //trae la accion cambia el estado y llama a las funciones suscriptas
    function dispatch(accion){
        estado = reducer(estado,accion)
        for(const subscriptor of suscriptores){
            subscriptor()
        }

    }
    //agrega a una funcion a suscriptores
    function subscribe(funcion){
        suscriptores.push(funcion)
    }
    //sirve las funciones
    return {getState, dispatch, subscribe}
}

