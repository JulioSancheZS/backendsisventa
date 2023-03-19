"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbconexion_1 = __importDefault(require("../db/dbconexion"));
const EstadoVenta = dbconexion_1.default.define('EstadoVenta', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idestadoventa' // Aquí especificas que la columna en la BD se llama "idcategoria"
    },
    estado: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    // I don't want createdAt
    createdAt: false,
    // I want updatedAt to actually be called updateTimestamp
    updatedAt: false
});
exports.default = EstadoVenta;
