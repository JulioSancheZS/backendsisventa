import { Model, DataTypes, Optional, Association } from 'sequelize';
import db from '../db/dbconexion';
import Cliente from './cliente';
import EstadoVenta from './estadoventa';
import Usuario from './usuario';

interface VentaAttributes {
  id: number;
  idcliente: number;
  idusuario: number;
  idestadoventa: number;
  nofactura: string;
  fechaventa: Date;
}

interface VentaCreationAttributes extends Optional<VentaAttributes, 'id'> {}

class Venta extends Model<VentaAttributes, VentaCreationAttributes> implements VentaAttributes {
  public id!: number;
  public idcliente!: number;
  public idusuario!: number;
  public idestadoventa!: number;
  public nofactura!: string;
  public fechaventa!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(): void {
    Venta.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'idventa',
        },
        idcliente: {
          type: DataTypes.INTEGER,
        },
        idusuario: {
          type: DataTypes.INTEGER,
        },
        idestadoventa: {
          type: DataTypes.INTEGER,
        },
        nofactura: {
          type: DataTypes.STRING,
        },
        fechaventa: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize: db,
        createdAt: false,
        updatedAt: false,
        tableName: 'ventas',
      }
    );
  }
}

Venta.initModel();

Venta.belongsTo(Cliente, { foreignKey: 'idcliente', as: 'cliente' });
Venta.belongsTo(EstadoVenta, { foreignKey: 'idestadoventa', as: 'estado' });
Venta.belongsTo(Usuario, { foreignKey: 'idusuario', as: 'usuario' });

export default Venta;

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