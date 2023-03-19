import { DataTypes } from 'sequelize'
import db from '../db/dbconexion'
import Categoria from './categoria';

const Producto = db.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idProducto' // Aquí especificas que la columna en la BD se llama "idcategoria"
    },
    idCategoria: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2)
    },
    existencia: {
        type: DataTypes.INTEGER
    },
    stockMinimo: {
        type: DataTypes.INTEGER
    },
    stockMaximo: {
        type: DataTypes.INTEGER
    },
    fechaRegistro: {
        type: DataTypes.DATE
    },
    activo: {
        type: DataTypes.BOOLEAN
    }
}, {
    // I don't want createdAt
    createdAt: false,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: false
})
Producto.belongsTo(Categoria, { foreignKey: 'idCategoria' }); // Producto pertenece a una Categoria (inner join)

export default Producto