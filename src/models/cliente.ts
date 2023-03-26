import { DataTypes, Model } from 'sequelize';
import db from '../db/dbconexion';

interface ClienteAttributes {
  id: number;
  primernombre: string;
  segundonombre: string;
  primerapellido: string;
  segundoapellido: string;
  direccion: string;
  telefono: string;
  NombreCompleto: string;
}

interface ClienteInstance extends Model<ClienteAttributes>, ClienteAttributes {}

const Cliente = db.define<ClienteInstance>('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idcliente',
  },
  primernombre: {
    type: DataTypes.STRING,
  },
  primerapellido: {
    type: DataTypes.STRING,
  },
  segundonombre: {
    type: DataTypes.STRING,
  },
  segundoapellido: {
    type: DataTypes.STRING,
  },
  direccion: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  NombreCompleto: {
    type: DataTypes.VIRTUAL,
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

export default Cliente;
