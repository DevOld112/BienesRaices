import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import  usuarioRoutes  from './routes/usuarioRoutes.js'
import  propiedadesRoutes  from './routes/propiedadesRoutes.js'
import appRoutes from './routes/appRoutes.js'
import apiRoutes from './routes/apiRoutes.js'
import db from './config/db.js'



// Crear la app
const app = express()

// Habilitar lectura de formularios 

app.use ( express.urlencoded({extended: true}))

//Habilitar cookieParser

app.use( cookieParser())

//Habilitar CSRF

app.use(csrf({cookie: true}) )

// Conexion a la base de datos
try {
    await db.authenticate();
    db.sync()
    console.log('Conexion Correcta a la Base de datos')
} catch (error) {
    console.log(error)
}

//Routing
app.use('/', appRoutes)
app.use('/auth', usuarioRoutes)
app.use('/', propiedadesRoutes)
app.use('/api', apiRoutes)

//Habilitando Pug

app.set('view engine', 'pug');
app.set('views', './views')



//Definir un puerto y arrancar el proyecto

const port = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`El servidor esta funcionando en el puerto: ${port}`)
})

//Carpeta Publica

app.use(express.static('public'))

