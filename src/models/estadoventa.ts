import { DataTypes } from 'sequelize'
import db from '../db/dbconexion'


const EstadoVenta = db.define('EstadoVenta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idestadoventa' // Aquí especificas que la columna en la BD se llama "idcategoria"
    },
    estado: {
        type: DataTypes.STRING
    }
    
}, {
    // I don't want createdAt
    createdAt: false,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: false
})

export default EstadoVenta