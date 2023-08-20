import express from 'express';
import { formularioLogin, formularioOlvidePassword,autenticar, recuperarPassword, registrar, confirmar, formularioRegistro, comprobarToken, nuevoPassword, cerrarSesion, redireccionLogin, redireccionRegistro, redireccionOlvidePassword } from '../controllers/usuarioController.js';


const router = express.Router()



// Routing 

router.get('/login' , redireccionLogin, formularioLogin )
router.post('/login', autenticar)

//Cerrar sesion

router.post('/cerrar-sesion', cerrarSesion)

//Registrar

router.get('/registro', redireccionRegistro, formularioRegistro)
router.post('/registro', registrar)

router.get('/confirmar/:token', confirmar)

//Olvidar Password

router.get('/olvide-password', redireccionOlvidePassword, formularioOlvidePassword)
router.post('/olvide-password', recuperarPassword)

router.get('recuperar-password', comprobarToken)

//Almacenar nueva contraseña

router.get('/olvide-password/:token', comprobarToken)
router.post('/olvide-password/:token', nuevoPassword)
    

export default router
