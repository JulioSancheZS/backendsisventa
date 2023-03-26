"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbconexion_1 = __importDefault(require("../db/dbconexion"));
const Cliente = dbconexion_1.default.define('Cliente', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idcliente',
    },
    primernombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    primerapellido: {
        type: sequelize_1.DataTypes.STRING,
    },
    segundonombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    segundoapellido: {
        type: sequelize_1.DataTypes.STRING,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
    },
    NombreCompleto: {
        type: sequelize_1.DataTypes.VIRTUAL,
        get() {
            const nombres = [this.getDataValue('primernombre'), this.getDataValue('segundonombre')].filter(Boolean).join(' ');
            const apellidos = [this.getDataValue('primerapellido'), this.getDataValue('segundoapellido')].filter(Boolean).join(' ');
            return `${nombres} ${apellidos}`;
        },
    },
}, {
    createdAt: false,
    updatedAt: false,
});
exports.default = Cliente;
