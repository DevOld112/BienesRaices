import express from 'express'
import { inicio, categoria, buscador, noEncontrado } from '../controllers/appController.js';
import { cerrarSesion } from '../controllers/usuarioController.js'
import { sesion } from '../helpers/index.js';
import identificarUsuario from '../middleware/identificarUsuario.js'

const router = express.Router();

// Pagina de Inicio

router.get('/',
    identificarUsuario,
    inicio,
)

// Cerrar Sesion en Inicio

router.post('/cerrar-sesion',cerrarSesion)


// Categorias

router.get('/categorias/:id', categoria)

// Buscador

router.post('/buscador', buscador)

// Pagina 404

router.get('/404', noEncontrado)

export default router;