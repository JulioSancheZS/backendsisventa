"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbconexion_1 = __importDefault(require("../db/dbconexion"));
const cliente_1 = __importDefault(require("./cliente"));
const estadoventa_1 = __importDefault(require("./estadoventa"));
const usuario_1 = __importDefault(require("./usuario"));
class Venta extends sequelize_1.Model {
    static initModel() {
        Venta.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'idventa',
            },
            idcliente: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            idusuario: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            idestado: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            nofactura: {
                type: sequelize_1.DataTypes.STRING,
            },
            fechaventa: {
                type: sequelize_1.DataTypes.DATE,
            },
        }, {
            sequelize: dbconexion_1.default,
            createdAt: false,
            updatedAt: false,
            tableName: 'ventas',
        });
    }
}
Venta.initModel();
Venta.belongsTo(cliente_1.default, { foreignKey: 'idcliente', as: 'cliente' });
Venta.belongsTo(estadoventa_1.default, { foreignKey: 'idestadoventa', as: 'estado' });
Venta.belongsTo(usuario_1.default, { foreignKey: 'idusuario', as: 'usuario' });
exports.default = Venta;
/**
 *
 * Este código define el modelo de datos para una tabla llamada "ventas" en una
 * base de datos utilizando la librería Sequelize. El modelo "Venta" es una
 *  clase que extiende de la clase "Model" de Sequelize y define las propiedades de
 * la tabla "ventas".

Las interfaces "VentaAttributes" y "VentaCreationAttributes" definen las propiedades
 y tipos de datos de la tabla "ventas", incluyendo las propiedades opcionales. La clase
  "Venta" implementa estas interfaces, de manera que tiene todas las propiedades definidas
  en "VentaAttributes" y la posibilidad de crear una instancia con propiedades opcionales
   definidas en "VentaCreationAttributes".

En el método estático "initModel()", se llama al método "init" de Sequelize para definir
 las propiedades de la tabla "ventas". Las propiedades se definen en un objeto que se le
  pasa como primer parámetro a la función "init". Cada propiedad de la tabla se define
   como una propiedad de este objeto, y se le especifica el tipo de datos y otras opciones.

La opción "sequelize" se utiliza para especificar la conexión a la base de datos que se
utilizará para interactuar con la tabla "ventas". Las opciones "createdAt" y "updatedAt"
se utilizan para especificar que no se debe incluir las fechas de creación y actualización
de la tabla "ventas". La opción "tableName" se utiliza para especificar el nombre de la
tabla "ventas" en la base de datos.

Por último, se define la relación entre la tabla "ventas" y las tablas "cliente",
"estadoventa" y "usuario". Se utiliza el método "belongsTo" de Sequelize para definir
que la tabla "ventas" tiene una relación de uno a uno con la tabla "cliente",
"estadoventa" y "usuario", especificando la clave foránea que se utilizará para
unir las tablas y un alias para la relación.
 */ 
