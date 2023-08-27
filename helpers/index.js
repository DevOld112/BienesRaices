const esVendedor = (usuarioId, propiedadUsuarioId) => {
    console.log(usuarioId)
    return usuarioId === propiedadUsuarioId
}

const formatearFecha = fecha =>{

    return new Date(fecha).toISOString().slice(0, 10)
}

const sesion = (usuarioId) =>{
    return usuarioId
}



export {
    esVendedor,
    formatearFecha,
    sesion
}