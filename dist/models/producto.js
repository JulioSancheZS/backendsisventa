"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbconexion_1 = __importDefault(require("../db/dbconexion"));
const categoria_1 = __importDefault(require("./categoria"));
const Producto = dbconexion_1.default.define('Producto', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idProducto' // Aquí especificas que la columna en la BD se llama "idProducto"
    },
    idCategoria: {
        type: sequelize_1.DataTypes.INTEGER
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    precio: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2)
    },
    existencia: {
        type: sequelize_1.DataTypes.INTEGER
    },
    stockMinimo: {
        type: sequelize_1.DataTypes.INTEGER
    },
    stockMaximo: {
        type: sequelize_1.DataTypes.INTEGER
    },
    fechaRegistro: {
        type: sequelize_1.DataTypes.DATE
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
}, {
    // I don't want createdAt
    createdAt: false,
    // I want updatedAt to actually be called updateTimestamp
    updatedAt: false
});
Producto.belongsTo(categoria_1.default, { foreignKey: 'idCategoria' }); // Producto pertenece a una Categoria (inner join)
exports.default = Producto;
