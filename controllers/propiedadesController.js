import { validationResult } from "express-validator"
import { unlink } from 'node:fs/promises';
import { Precio, Categoria, Propiedad, Mensaje, Usuario} from '../models/index.js'
import { esVendedor, formatearFecha } from "../helpers/index.js";



const admin = async(req, res) =>{

    //Leer el queryString

    const { pagina: paginaActual } = req.query;


    const regex = /^[0-9]$/

    if(!regex.test(paginaActual)){
        return res.redirect('/mis-propiedades?pagina=1')
    }

    try {

        const { id } = req.usuario

        //Limites y offset para el paginador

        const limit = 5;
        const offset = ((paginaActual * limit ) - limit)

        const [propiedades, total] = await Promise.all([
            Propiedad.findAll({
                limit: limit,
                offset,
                where: {
                    usuarioId: id
                },
                include: [
                    { model: Categoria, as: 'categoria' },
                    { model: Precio, as: 'precio'},
                    { model: Mensaje, as: 'mensajes'}
                ]
            }),
            Propiedad.count({
                where:{
                    usuarioId: id
                }
            })
        ])

    
        res.render('propiedades/admin', {
            pagina: 'Mis Propiedades',
            csrfToken: req.csrfToken(), 
            propiedades,
            paginas: Math.ceil(total / limit),
            paginaActual: Number(paginaActual),
            total,
            offset,
            limit
        })
        
    } catch (error) {
        console.log(error)
    }


}

//Formulario para crear propiedad

const crear = async(req, res) => {
    //Consultar Modelo de Precio y Categorias
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])
    
    
    res.render('propiedades/crear', {
        pagina: 'Crear Propiedad',
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos:{}
    })
}

const guardar = async (req, res) => {
    //Resultado de validacion

    let resultado = validationResult(req)

    if(!resultado.isEmpty()) {

        //Consultar modelo de precio y categoria

        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])

    return res.render('propiedades/crear', {
                pagina: 'Crear Propiedad',
                categorias,
                precios,
                csrfToken: req.csrfToken(),
                errores: resultado.array(),
                datos: req.body
            })

    }

    //Crear un registro

    const { titulo, descripcion, categoria: categoriaId, habitaciones, estacionamiento, wc, calle, lat, lng, precio } = req.body


    const { id: usuarioId } = req.usuario

    try {
        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            categoriaId,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioId : precio,
            usuarioId,
            imagen: ''

        })

        const { id } = propiedadGuardada;

        res.redirect(`/propiedades/agregar-imagen/${id}`)



    } catch (error) {
        console.log(error)
    }
}

//Agregando una imagen

const agregarImagen = async(req,res) =>{

    const { id } = req.params

    //Validar que la propiedad exista

    const propiedad = await Propiedad.findByPk(id)

    if(!propiedad) {
        return res.redirect('/mis-propiedades')
    }

    //Validar que la propiedad no este publicada

    const publicada = propiedad.publicado

    if(publicada){
        return res.redirect('/mis-propiedades')
    }

    //Validar que la propiedad pertenece a quien visita esta pagina

    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect('/mis-propiedades')
    }

    res.render('propiedades/agregar-imagen', {
        pagina: `Agregar Imagen: ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        propiedad
    })
}

const almacenarImagen = async(req, res, next) => {
    
    const { id } = req.params

    //Validar que la propiedad exista

    const propiedad = await Propiedad.findByPk(id)

    if(!propiedad) {
        return res.redirect('/mis-propiedades')
    }

    //Validar que la propiedad no este publicada

    const publicada = propiedad.publicado

    if(publicada){
        return res.redirect('/mis-propiedades')
    }

    //Validar que la propiedad pertenece a quien visita esta pagina

    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect('/mis-propiedades')
    }

    try {

        console.log(req.file)

        //almacenar la imagen y publicar la propiedad
        propiedad.imagen = req.file.filename

        propiedad.publicado = 1;

        await propiedad.save()


        next()
    
        
    } catch (error) {
        console.log(error)
    }


}

const propiedadCreada = (req, res) => {

    res.render('propiedades/propiedad-creada', {
        pagina: 'Propiedad Creada Exitosamente',
        mensaje: 'Gracias, por su confianza',
        csrfToken: req.csrfToken()
    })

}

const editar = async(req, res) =>{


    const { id } = req.params

    //Validar que la propiedad exista

    const propiedad = await Propiedad.findByPk(id)

    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }

    //Revisar que quien visita la URL es quien crea la propiedad

    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/mis-propiedades')
    }


    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])
    
    
    res.render('propiedades/editar', {
        pagina: `Editar Propiedad: ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: propiedad
    })

}

const guardarCambios = async(req, res) => {

    //Verificar la validacion

    

    const { id } = req.params

    //Validar que la propiedad exista

    const propiedad = await Propiedad.findByPk(id)

    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }

    //Revisar que quien visita la URL es quien crea la propiedad

    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/mis-propiedades')
    }

    let resultado = validationResult(req)

    if(!resultado.isEmpty()) {

        //Consultar modelo de precio y categoria

        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])

    return res.render('propiedades/editar', {
            pagina: 'Editar Propiedad',
            csrfToken: req.csrfToken(),
            categorias,
            precios, 
            errores: resultado.array(),
            datos: req.body
        })

    }

    
    //Reescribiendo el Objeto

    try {

        const { titulo, descripcion, categoria: categoriaId, habitaciones, estacionamiento, wc, calle, lat, lng, precio:precioId } = req.body;

        propiedad.set({
            titulo,
            descripcion,
            categoriaId,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioId
        })


        await propiedad.save();

        res.redirect('/mis-propiedades')
        
    } catch (error) {
        console.log(error)
    }


}

const eliminar = async (req, res) => {

    const { id } = req.params

        //Validar que la propiedad exista

        const propiedad = await Propiedad.findByPk(id)

        if(!propiedad){
            return res.redirect('/mis-propiedades')
        }
    
        //Revisar que quien visita la URL es quien crea la propiedad
    
        if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
            return res.redirect('/mis-propiedades')
        }


        //Eliminar la imagen
        

        await unlink(`public/uploads/${propiedad.imagen}`)

        console.log(`Se elimino la imagen de ${propiedad.imagen}`)
    

        //Eliminar la propiedad

        await propiedad.destroy()

        res.redirect('/mis-propiedades')

        
    
}

//Muestra una propiedad

const mostrarPropiedad = async(req, res) =>{

    const { id } = req.params;

    //Comprobar que la propiedad exista

    const propiedad = await Propiedad.findByPk(id, {
        include: [
            { model: Categoria, as: 'categoria' },
            { model: Precio, as: 'precio'}
        ]
    });

    if(!propiedad){
        return res.redirect('/404')
    }



    res.render('propiedades/mostrar', {
        pagina: 'Propiedades en Venta',
        csrfToken: req.csrfToken(), 
        propiedad,
        usuario: req.usuario,
        esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId)
    })
    
}

const enviarMensaje = async (req, res) =>{
    

    const { id } = req.params;

    //Comprobar que la propiedad exista

    const propiedad = await Propiedad.findByPk(id, {
        include: [
            { model: Categoria, as: 'categoria' },
            { model: Precio, as: 'precio'}
        ]
    });

    if(!propiedad){
        return res.redirect('/404')
    }

    // Renderizar los errores

    let resultado = validationResult(req)

    if(!resultado.isEmpty()) {

        return res.render('propiedades/mostrar', {
                propiedad,
                pagina: propiedad.titulo,
                usuario: req.usuario,
                csrfToken: req.csrfToken(),
                errores: resultado.array(),
                esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId)
            })

    }

    const { mensaje } = req.body;
    const { id: propiedadId } = req.params;
    const { id: usuarioId } = req.usuario

    console.log(req.body)
    console.log(req.params)

    // Almacenar Mensaje

    await Mensaje.create({
        mensaje,
        propiedadId,
        usuarioId
        
    })

    res.redirect('/')

    console.log('Mensaje Enviado')

}

// Leer Mensajes Recibidos

const verMensajes = async (req, res) => {

    const { id } = req.params

    //Validar que la propiedad exista

    const propiedad = await Propiedad.findByPk(id , {
        include: [
            { model: Mensaje, as: 'mensajes', 
                include: [
                    {model: Usuario.scope('eliminarPassword'), as: 'usuario'}
                ]
            }
        ]
    })

    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }

    //Revisar que quien visita la URL es quien crea la propiedad

    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/mis-propiedades')
    }



    res.render('propiedades/mensajes', {
        pagina: 'Mensajes',
        mensajes: propiedad.mensajes,
        formatearFecha
    })
}


export {
    admin,
    crear,
    guardar,
    agregarImagen,
    almacenarImagen,
    propiedadCreada,
    editar,
    guardarCambios,
    eliminar,
    mostrarPropiedad,
    enviarMensaje,
    verMensajes
}