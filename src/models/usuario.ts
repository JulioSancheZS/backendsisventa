import { DataTypes } from 'sequelize'
import db from '../db/dbconexion'

const Usuario = db.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idusuario' // Aquí especificas que la columna en la BD se llama "idcategoria"
    },
    idrol: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    login: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }, 
    corre: {
        type: DataTypes.STRING
    }, 
    telefono: {
        type: DataTypes.STRING
    }, 
    fecharegistro: {
        type: DataTypes.DATE
    }, 
    activo: {
        type: DataTypes.BOOLEAN
    }, 
}, {
    // I don't want createdAt
    createdAt: false,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: false
})

export default Usuario