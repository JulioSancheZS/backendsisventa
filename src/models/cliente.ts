import { DataTypes } from 'sequelize'
import db from '../db/dbconexion'

const Cliente = db.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idcliente' // Aquí especificas que la columna en la BD se llama "idcategoria"
    },
    primernombre: {
        type: DataTypes.STRING
    },
    primerapellido: {
        type: DataTypes.STRING
    },
    segundonombre: {
        type: DataTypes.STRING
    },
    segundoapellido: {
        type: DataTypes.STRING
    }, 
    direccion: {
        type: DataTypes.STRING
    }, 
    telefono: {
        type: DataTypes.STRING
    }, 
}, {
    // I don't want createdAt
    createdAt: false,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: false
})

export default Cliente