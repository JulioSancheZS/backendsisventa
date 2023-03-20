import { DataTypes } from 'sequelize'
import db from '../db/dbconexion'

const Rol = db.define('rol', {
    idrol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idrol' // Aquí especificas que la columna en la BD se llama "idcategoria"
    },
    nombrerol: {
        type: DataTypes.STRING
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

export default Rol