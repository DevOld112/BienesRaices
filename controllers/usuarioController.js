import { check, cookie, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import Usuario from '../models/Usuario.js'
import { generarID, generarJWT } from '../helpers/tokens.js'
import { emailRegistro, emailRecuperar } from '../helpers/emails.js'

const formularioLogin = (req, res) =>{
    res.render('auth/login', {
        pagina: 'Iniciar Sesion',
        csrfToken: req.csrfToken()
    })
}

const autenticar = async (req, res) => {

    //Validacion

    await check('email').isEmail().withMessage('El Email es Obligatorio').run(req)
    await check('password').notEmpty().withMessage('El Password debe ser al menos 6 caracteres').run(req)

    let resultado = validationResult(req);


    //Verificar que el resultado este vacio 
    if(!resultado.isEmpty()){
        //Errores
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        })
    }

    const { email, password } = req.body;

    //Comprobar si el usuario existe

    const usuario = await Usuario.findOne({where: {email} })

    if(!usuario){
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El usuario no existe'}]
        })
    }


    //Confirmando si el usuario esta confirmado

    if(!usuario.confirmado){
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'Tu cuenta no ha sido confirmada'}]
        })
    }

    //Confirmar si la contraseña es valida

    if(!usuario.verificarPassword(password)){
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'Tu contraseña es Incorrecta'}]
        })
    }

    // Autenticar el usuario

    const token = generarJWT({id: usuario.id, nombre: usuario.nombre})


    // Almacenar en un cookie

    return res.cookie('_token', token, {
        httpOnly: true,
        // secure: true,
    }).redirect('/mis-propiedades')

    
}

// Cerrando sesion del Usuario

const cerrarSesion = async(req, res) => {

        //Elimino la cookie

        res.clearCookie('_token').status(200)


        res.render('templates/logout', {
            pagina: 'Sesion cerrada correctamente',
            mensaje: 'Por favor, vuelva pronto...',
            csrfToken: req.csrfToken()
        })


}


//Redireccionando el login si el usuario tiene token

const redireccionLogin = async (req, res) =>{

    const { _token } = await req.cookies

    if(_token){
        return res.redirect('/mis-propiedades')
    } 

    return res.render('auth/login', {
        pagina: 'Iniciar Sesion',
        csrfToken: req.csrfToken(),
    })

}

//Redireccionando el Registro si el usuario tiene token

const redireccionRegistro = async (req, res) =>{

    const { _token } = await req.cookies

    if(_token){
        return res.redirect('/mis-propiedades')
    } 

    return res.render('auth/registro', {
        pagina: 'Crear una cuenta',
        csrfToken: req.csrfToken(),
    })

}


//Redireccion el olvido de contraseña si el usuario tiene token

const redireccionOlvidePassword= async (req, res) =>{

    const { _token } = await req.cookies

    if(_token){
        return res.redirect('/mis-propiedades')
    } 

    return res.render('auth/olvide-password', {
        pagina: 'Restablecer Contraseña',
        csrfToken: req.csrfToken(),
    })

}



const formularioRegistro = (req, res) =>{
    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
        csrfToken: req.csrfToken()
    })
}

const registrar = async (req, res) => {
    
    //validacion

    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({min: 6}).withMessage('El Password debe ser al menos 6 caracteres').run(req)
    await check('password2').equals(req.body.password).isLength({min: 6}).withMessage('Los password no son iguales').run(req)

    let resultado = validationResult(req);

    //Conseguir la variable de mensaje de error

    // return render.json(resultado.array())

    //Verificar que el resultado este vacio 
    if(!resultado.isEmpty()){
        //Errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    //Extraer datos (destructuring)

    const { nombre, email, password } = req.body

    //Verificar que el usuario existe en la Base de datos

    const existeUsuario = await Usuario.findOne( { where: { email }})
    if(existeUsuario){
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El Usuario ya se encuentra registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    //Almacenar un usuario
    
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarID()
    })

    //Enviando Email de Confirmacion

    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    //Mostrar mensaje de confirmacion

    res.render('templates/mensaje', {
        pagina: 'Cuenta creada correctamente',
        mensaje: 'Hemos enviado un Email de confirmacion, presiona en el enlace'
    })


}

    // Funcion que comprueba una cuenta
    
    const confirmar = async (req, res) => {

        const { token } = req.params

        //Si el token es valido

        const usuario = await Usuario.findOne({where: {token}})

        console.log(usuario)

        if(!usuario) {
            res.render('templates/confirmacion',{
                pagina: 'Error al confirmar tu cuenta',
                mensaje: 'Hubo un error al confirmar tu cuenta. Intenta de nuevo',
                error: true
            })
        }

        //Confirmar cuenta
        usuario.token = null;
        usuario.confirmado = true
        await usuario.save()

        console.log(usuario)

        res.render('templates/confirmacion', {
            pagina: 'Cuenta confirmada',
            mensaje: 'La cuenta ha sido confirmada, Por favor intente ingresar.',
            error: false
        })
    }

const formularioOlvidePassword = (req, res) =>{
        res.render('auth/olvide-password', {
        pagina: 'Recupera tu Acceso a BienesRaices',
        csrfToken: req.csrfToken()
    })
}

    // Seccion: 11 - Reto personal, armar la funcionalidad de recuperar password

const recuperarPassword = async (req, res) => {
    
    //validacion

    await check('email').isEmail().withMessage('Eso no parece un email').run(req)

    let resultado = validationResult(req);


    //Verificar que el resultado este vacio 
    if(!resultado.isEmpty()){
        //Errores
        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu Acceso a BienesRaices',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        })
    }

    //Buscando si existe un usuario

    const { email } = req.body;

    const usuario = await Usuario.findOne({where: {email} });

    if(!usuario) {
        res.render('auth/olvide-password', {
            pagina: 'Recupera tu Acceso a BienesRaices',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'Ese email no existe en los registros, Por favor volver a intentar'}]
        });
    }
    
    //Generar un token y enviar el email

    usuario.token = generarID();
    await usuario.save();

    //Enviar un Email

    emailRecuperar({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
    })

    // Renderizar un mensaje

    res.render('templates/mensaje', {
        pagina: 'Restablece tu Password',
        mensaje: 'Hemos enviado un Email con las instrucciones, busca en tu bandeja de entrada '
    })

}

const comprobarToken = async(req, res) =>{

    const { token } = req.params

    const usuario = await Usuario.findOne({where: {token} })

    if(!usuario){
        res.render('templates/confirmacion',{
        pagina: 'Restablece tu Password',
        mensaje: 'Hubo un error al validar tu informacion, intenta de nuevo',
        error: true
        })
    }

    //Mostrar Formulario para la generacion de nuevo Password

    res.render('auth/recuperar-password', {
        pagina: 'Cambia tu Contraseña',
        csrfToken: req.csrfToken()
    })
}

const nuevoPassword = async (req, res) =>{
    //Validando Password

    await check('password').isLength({min: 6}).withMessage('El Password debe ser al menos 6 caracteres').run(req)

    let resultado = validationResult(req);

    //Verificar que el resultado este vacio 
    if(!resultado.isEmpty()){
        //Errores
        return res.render('auth/recuperar-password', {
            pagina: 'Restablece tu Password',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        })
    }

    const { token } = req.params;
    const { password } = req.body;

    //Identificar quien hace el cambio

    const usuario = await Usuario.findOne({where: {token} })


    //Hashear el nuevo Password

    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    usuario.token = null;

    await usuario.save()

    res.render('templates/confirmacion', {
        pagina: 'Password Restablecido',
        mensaje: 'El password se guardo correctamente'
    })


}

// Comprobar Inicio de Sesion





export {
    formularioLogin,
    autenticar,
    redireccionLogin,
    redireccionRegistro,
    redireccionOlvidePassword,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword,
    recuperarPassword,
    comprobarToken,
    nuevoPassword,
    cerrarSesion,
    
}