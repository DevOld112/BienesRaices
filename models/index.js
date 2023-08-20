import Propiedad from './Propiedad.js'
import Categoria from './Categoria.js'
import Precio from './Precio.js'
import Usuario from './Usuario.js'

// Precio.hasOne(Propiedad);

Propiedad.belongsTo(Precio, {foreignKey: 'precioId'}) //Es lo mismo que hasOne pero escrito de manera diferente

//Reto 02

Propiedad.belongsTo(Categoria, {foreignKey: 'categoriaId'});
Propiedad.belongsTo(Usuario, {foreignKey: 'usuarioId'});

export {
    Propiedad,
    Precio,
    Categoria,
    Usuario
}