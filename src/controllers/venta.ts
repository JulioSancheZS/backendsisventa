import { Request, Response } from 'express'
import DetalleVenta from '../models/detalleventa';
import Venta from '../models/venta';
import db from '../db/dbconexion'
import sequelize from '../db/dbconexion';


//Nueva Venta
interface DetalleVentaAttributes {
  idventa: number;
  idproducto: number;
  cantidad: number;
  precioventa: number;
}

export const postVenta = async (req: Request, res: Response) => {
    const { body } = req;
    const detalles: DetalleVentaAttributes[] = body.detalles;
  
    const t = await sequelize.transaction();
    try {
      const venta = await Venta.create({
        idcliente: body.idcliente,
        idusuario: body.idusuario,
        idestadoventa: body.idestadoventa,
        nofactura: body.nofactura,
        fechaventa: new Date(),
      }, { transaction: t });
  
      const detallesVenta = detalles.map((detalle) => {
        return {
          idventa: venta.id,
          idproducto: detalle.idproducto,
          cantidad: detalle.cantidad,
          precioventa: detalle.precioventa,
        };
      });
  
      await DetalleVenta.bulkCreate(detallesVenta, { transaction: t });
  
      await t.commit();
  
      res.status(201).json({
        ok: true,
        msg: 'Venta creada correctamente',
        venta,
      });
    } catch (error) {
      await t.rollback();
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al crear la venta',
      });
    }
  };
  
