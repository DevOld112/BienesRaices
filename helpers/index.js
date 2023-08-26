const esVendedor = (usuarioId, propiedadUsuarioId) => {
    return usuarioId === propiedadUsuarioId
}

const formatearFecha = fecha =>{

    return new Date(fecha).toISOString().slice(0, 10)
}

export {
    esVendedor,
    formatearFecha
}