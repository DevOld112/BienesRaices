

# 🏠 Bienes Raíces - Node.js  

**Aplicación web MVC para gestión de propiedades inmobiliarias**  
Proyecto construido con Node.js, Express, Pug (templating), TailwindCSS (estilos), MySQL (base de datos) y Sequelize (ORM).  

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue)](https://www.mysql.com/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey)](https://expressjs.com/)

---

## 📦 Características  
- ✅ Autenticación de usuarios (JWT + cookies)  
- 🏘️ CRUD completo de propiedades inmobiliarias  
- 📸 Subida de imágenes con Multer y Dropzone  
- 🎨 Diseño responsive con TailwindCSS  
- ✔️ Validación de formularios con Express-Validator  
- ✉️ Envío de emails con Nodemailer  
- 🗃️ Base de datos relacional con MySQL y Sequelize  

---

## 🚀 Instalación  

### Requisitos previos:
- Node.js v18+
- MySQL 8.0+
- npm 9.x

### Pasos:
1. **Clonar el repositorio**:
```bash
git clone https://github.com/tu-usuario/bienesraices---nodejs.git
cd bienesraices---nodejs


2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar entorno**:
   - Copiar el archivo `.env.example` a `.env`
   - Configurar las variables:
     ```env
     DB_NAME=tu_basedatos
     DB_USER=tu_usuario
     DB_PASS=tu_contraseña
     DB_HOST=localhost
     JWT_SECRET=tu_secreto_jwt
     MAIL_USER=tu_email@gmail.com
     MAIL_PASS=tu_password_email
     ```

4. **Inicializar base de datos**:
```bash
npm run db:importar
```

---

## 🛠 Uso  

### Comandos disponibles:
| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor en producción |
| `npm run server` | Inicia con nodemon (desarrollo) |
| `npm run css` | Compila TailwindCSS (modo watch) |
| `npm run js` | Compila JavaScript con Webpack |
| `npm run dev` | Ejecuta Tailwind + Webpack en paralelo |
| `npm run db:importar` | Poblar la base de datos con datos de prueba |
| `npm run db:eliminar` | Limpiar la base de datos |

### Estructura del proyecto:
```
bienesraices---nodejs/
├── src/
│   ├── controllers/    # Controladores MVC
│   ├── models/         # Modelos de Sequelize
│   ├── views/          # Plantillas Pug
│   ├── routes/         # Rutas de Express
│   ├── public/         # Assets (CSS/JS/img)
│   └── seed/           # Datos iniciales
├── .env.example        # Plantilla de variables
└── index.js            # Punto de entrada
```

---

## 🌐 Tecnologías  

### Backend:
- ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) Node.js v18
- ![Express](https://img.shields.io/badge/-Express-000000?logo=express) Express 4.x
- ![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?logo=sequelize) Sequelize ORM

### Frontend:
- ![Pug](https://img.shields.io/badge/-Pug-A86454?logo=pug) Pug (ex-Jade) templating
- ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-06B6D4?logo=tailwind-css) TailwindCSS 3.x

### Base de datos:
- ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql) MySQL 8.0+

### Herramientas:
- ![Webpack](https://img.shields.io/badge/-Webpack-8DD6F9?logo=webpack) Webpack 5
- ![Nodemailer](https://img.shields.io/badge/-Nodemailer-009688?logo=nodemailer) Nodemailer

---

## 📸 Demo  
*(Algunas capturas de pantalla de la aplicacion)*  

![image](https://github.com/DevOld112/BienesRaices/assets/32624313/9bd791bd-da6f-4e11-a81f-44cae67ec852)  
![image](https://github.com/DevOld112/BienesRaices/assets/32624313/4a5bcbf1-2cf7-43b3-a365-78aee5a1ef29)

---

## 🤝 Contribución  

1. Haz un fork del proyecto
2. Crea tu rama feature (`git checkout -b feature/awesome-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add awesome feature'`)
4. Haz push a la rama (`git push origin feature/awesome-feature`)
5. Abre un Pull Request

---

## 📄 Licencia  
Este proyecto está bajo la licencia **ISC**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## ✉️ Contacto  
¿Tienes preguntas o sugerencias?  

- **Email**: [XwilmerX53@gmail.com](mailto:XwilmerX53@gmail.com)  
- **GitHub**: [@devold112](https://github.com/DevOld112)  
  

---

## 🙌 Agradecimientos  
- Profesor / tutor : Juan Pablo de la Torre Valdez.  
 
```




