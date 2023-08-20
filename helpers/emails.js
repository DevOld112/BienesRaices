import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }
    });

    const {email, nombre, token} = datos;

    // Enviar el email de confirmacion

    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu cuenta en BienesRaices.com',
        text: 'Confirma tu cuenta en BienesRaices.com',
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <h1 style="color: #333; text-align: center" >Bienvenido a BienesRaices</h1>
            <p style="color: #666;">Hola ${nombre}, me complace darte la bienvenida a nuestros servicios en Bienes raíces.</p>

            <p style="color: #666;">Para confirmar tu cuenta, haz click en el siguiente enlace:</p>
            <p style="text-align: center;">
                <a style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;" href="${process.env.BACKEND_URL}:${process.env.port ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta</a>
            </p>

            <p style="color: #666;">Si tú no creaste esta cuenta, ignora este correo.</p>
        </div>
        `
    })

}

const emailRecuperar = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }
    });

    const {email, nombre, token} = datos;

    //Enviar correo de recuperacion de contraseña

    await transport.sendMail({
        from:'Bienes Raices.com',
        to: email,
        subject: 'Recupera el acceso a BienesRaices',
        text: 'Recupera el acceso a BienesRaices',
        html: `

        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <h1 style="color: #333; text-align: center" >Recupera tu contraseña en BienesRaices</h1>
            <p style="color: #666;">Hola ${nombre}, hemos recibido tu peticion de recuperacion de contraseña</p>

            <p style="color: #666;">Para recuperar tu cuenta, haz click en el siguiente enlace:</p>
            <p style="text-align: center;">
                <a style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;" href="${process.env.BACKEND_URL}:${process.env.port ?? 3000}/auth/olvide-password/${token}">Recuperar Contraseña</a>
            </p>

            <p style="color: #666;">Si tú no solicitaste esta recuperacion, ignora este correo.</p>
        </div>
        
        
        `
    })

    console.log('Correo Enviado')
}


export{
    emailRegistro,
    emailRecuperar
}