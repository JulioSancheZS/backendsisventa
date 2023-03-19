import { DataTypes } from 'sequelize'
import db from '../db/dbconexion'
import Producto from './producto';
import Venta from './venta';

const DetalleVenta = db.define('DetalleVentas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'iddetalleventa' // Aquí especificas que la columna en la BD se llama "idcategoria"
    },
    idventa: {
        type: DataTypes.INTEGER
    },
    idproducto:{
        type: DataTypes.INTEGER
    },
    cantidad:{
        type: DataTypes.INTEGER
    },
    precioventa:{
        type: DataTypes.DECIMAL(10,2)
    },
    
}, {
    // I don't want createdAt
    createdAt: false,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: false
})

DetalleVenta.belongsTo(Producto, { foreignKey: 'idproducto', as: 'producto' });
DetalleVenta.belongsTo(Venta, { foreignKey: 'idventa', as: 'venta' });

export default DetalleVenta