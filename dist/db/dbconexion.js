"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Option 3: Passing parameters separately (other dialects)
//LocalHost
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'sisventa', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '1234', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
});
//Produccion
/*
  const sequelize = new Sequelize('sisventa', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
  }); */
exports.default = sequelize;
