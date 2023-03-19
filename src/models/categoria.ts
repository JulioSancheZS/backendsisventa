import {DataTypes} from 'sequelize'
import db from '../db/dbconexion'

//modelo
const Categoria = db.define('Categorias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idcategoria' // Aquí especificas que la columna en la BD se llama "idcategoria"
      },
    nombre: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.BOOLEAN
    }
},{
    // I don't want createdAt
  createdAt: false,

  // I want updatedAt to actually be called updateTimestamp
  updatedAt: false
})

export default Categoria