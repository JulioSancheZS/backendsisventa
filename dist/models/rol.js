"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbconexion_1 = __importDefault(require("../db/dbconexion"));
const Rol = dbconexion_1.default.define('rol', {
    idrol: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idrol' // Aquí especificas que la columna en la BD se llama "idcategoria"
    },
    nombrerol: {
        type: sequelize_1.DataTypes.STRING
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
exports.default = Rol;
