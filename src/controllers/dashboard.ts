import { Request, Response } from 'express'
import Producto from '../models/producto';
import Venta from '../models/venta';
import { Op, Sequelize } from 'sequelize';
import DetalleVenta from '../models/detalleventa';
import sequelize from '../db/dbconexion';
import Usuario from '../models/usuario';


export const getDashboard = async (req: Request, res: Response) => {

    try {
        // Obtener la lista de productos
        //const listaProductos = await Producto.findAll();
        // Obtener la cantidad de productos
        const cantidadProducto = await Producto.count();
        // Obtener las ventas de la semana
        const cantidadVentas = await Venta.count();

        const hoy = new Date();
        const semanaAtras = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 7);
        const ventasSemana = await Venta.findAll({
            where: {
                fechaventa: { [Op.between]: [semanaAtras, hoy] }
            }
        });

        // Obtener la cantidad de ventas de hoy
        const ventasHoy = await Venta.count({
            where: {
                fechaventa: { [Op.between]: [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)] }
            }
        });

      /* const ventasPorUsuario = await Venta.findAll({
            attributes: [
              'nombre',
              [sequelize.fn('COUNT', sequelize.col('idventa')), 'cantidadVentas']
            ],
            group: 'idusuario',
            raw: true
          });
          
*/
         
          //console.log(ventasPorUsuario)

        // Obtener el producto más vendido
        const [productoMasVendido] = await DetalleVenta.findAll({
            attributes: [
                'idproducto',
                [sequelize.fn('sum', sequelize.col('cantidad')), 'total']
            ],
            group: ['idproducto'],
            order: [[sequelize.literal('total'), 'DESC']],
            limit: 1,
            include: [
                {
                    model: Producto,
                    as: 'producto'
                }
            ]
        });
        //console.log(productoMasVendido)
          // Obtener la cantidad de clientes
         /* const clientes = await Venta.count({
            distinct: true,
            col: 'idcliente'
        });*/

         // Enviar la respuesta con los datos
         res.json({
            
            cantidadProducto,
            cantidadVentas,
            ventasSemana,
            ventasHoy,
            productoMasVendido
        
        });

    } catch (error) {
        console.log(error); // Imprimir el error en la consola

        res.status(500).json({ error: 'Error al obtener los datos' });
    }
}


