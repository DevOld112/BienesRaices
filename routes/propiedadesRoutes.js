import express  from "express";
import { admin, crear, guardar, agregarImagen, almacenarImagen, propiedadCreada, editar, guardarCambios, eliminar, mostrarPropiedad, enviarMensaje, verMensajes, perfil } from '../controllers/propiedadesController.js';
import { body } from "express-validator";
import protegerRuta from "../middleware/protegerRuta.js";
import upload from "../middleware/subirImagen.js";
import identificarUsuario from "../middleware/identificarUsuario.js";
import { sesion } from "../helpers/index.js";





const router = express.Router();

router.get('/mis-propiedades', protegerRuta ,admin);
router.get('/propiedades/crear', protegerRuta, crear);
router.post('/propiedades/crear',

    protegerRuta,

    body('titulo').notEmpty().withMessage('El titulo de Del anuncio es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripcion es Obligatoria').isLength({max: 400}).withMessage('La descripcion es muy larga'),

    body('categoria').notEmpty().withMessage('La categoria es Obligatoria'),
    body('precio').notEmpty().withMessage('El rango de precio es Obligatorio'),
    body('habitaciones').notEmpty().withMessage('El numero de habitaciones es Obligatoria'),
    body('estacionamiento').notEmpty().withMessage('El numero de estacionamientos es Obligatoria'),
    body('wc').notEmpty().withMessage('El numero de baños es Obligatorio'),
    body('calle').notEmpty().withMessage('Por favor seleccione una ubicacion en el mapa'),
    guardar

);

router.get('/propiedades/agregar-imagen/:id',
    protegerRuta,  
    agregarImagen

)

router.post('/propiedades/agregar-imagen/:id',
    protegerRuta,

    upload.single('imagen'),

    almacenarImagen

)

router.get('/propiedades/propiedad-creada', propiedadCreada)

router.get('/propiedades/editar/:id',
    protegerRuta,
    editar

)

router.post('/propiedades/editar/:id',

    protegerRuta,

    body('titulo').notEmpty().withMessage('El titulo de Del anuncio es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripcion es Obligatoria').isLength({max: 400}).withMessage('La descripcion es muy larga'),

    body('categoria').notEmpty().withMessage('La categoria es Obligatoria'),
    body('precio').notEmpty().withMessage('El rango de precio es Obligatorio'),
    body('habitaciones').notEmpty().withMessage('El numero de habitaciones es Obligatoria'),
    body('estacionamiento').notEmpty().withMessage('El numero de estacionamientos es Obligatoria'),
    body('wc').notEmpty().withMessage('El numero de baños es Obligatorio'),
    body('calle').notEmpty().withMessage('Por favor seleccione una ubicacion en el mapa'),
    guardarCambios


);

router.post('/propiedades/eliminar/:id', 

    protegerRuta,
    eliminar


)

//Area publica

router.get('/propiedad/:id',
    
    identificarUsuario,
    mostrarPropiedad,
    


)

// Almacenar los mensajes

router.post('/propiedad/:id', 
    identificarUsuario,
    body('mensaje').isLength({min: 10}).withMessage('El mensaje no puede ir vacio o es muy corto'),
    enviarMensaje


)


router.get('/mensajes/:id', 
    protegerRuta,
    verMensajes
)

// Perfil de usuario

router.get('/perfil/:id', 
    identificarUsuario,
    protegerRuta,
    perfil,
    sesion
)


export default router;