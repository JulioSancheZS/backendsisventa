"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbconexion_1 = __importDefault(require("../db/dbconexion"));
const producto_1 = __importDefault(require("./producto"));
const venta_1 = __importDefault(require("./venta"));
const DetalleVenta = dbconexion_1.default.define('DetalleVentas', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'iddetalleventa' // Aquí especificas que la columna en la BD se llama "idcategoria"
    },
    idventa: {
        type: sequelize_1.DataTypes.INTEGER
    },
    idproducto: {
        type: sequelize_1.DataTypes.INTEGER
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    precioventa: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2)
    },
}, {
    // I don't want createdAt
    createdAt: false,
    // I want updatedAt to actually be called updateTimestamp
    updatedAt: false
});
DetalleVenta.belongsTo(producto_1.default, { foreignKey: 'idproducto', as: 'producto' });
DetalleVenta.belongsTo(venta_1.default, { foreignKey: 'idventa', as: 'venta' });
exports.default = DetalleVenta;
