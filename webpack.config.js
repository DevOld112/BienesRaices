import path from 'path'


export default {
    mode: 'development',
    entry: {
        mapa: './src/js/mapa.js',
        agregarImagen: './src/js/agregarImagen.js',
        notificaciones: './src/js/notificaciones.js',
        mostrarMapa: './src/js/mostrarMapa.js',
        redireccion: './src/js/redireccion.js',
        mapaInicio: './src/js/mapaInicio.js'
    },
    output: {
    filename: '[name].js',
    path: path.resolve('public/js')
    },
    
}