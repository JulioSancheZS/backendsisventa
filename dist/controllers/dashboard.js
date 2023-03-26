"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = void 0;
const producto_1 = __importDefault(require("../models/producto"));
const venta_1 = __importDefault(require("../models/venta"));
const sequelize_1 = require("sequelize");
const detalleventa_1 = __importDefault(require("../models/detalleventa"));
const dbconexion_1 = __importDefault(require("../db/dbconexion"));
const getDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener la lista de productos
        //const listaProductos = await Producto.findAll();
        // Obtener la cantidad de productos
        const cantidadProducto = yield producto_1.default.count();
        // Obtener las ventas de la semana
        const cantidadVentas = yield venta_1.default.count();
        const hoy = new Date();
        const semanaAtras = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 7);
        const ventasSemana = yield venta_1.default.findAll({
            where: {
                fechaventa: { [sequelize_1.Op.between]: [semanaAtras, hoy] }
            }
        });
        // Obtener la cantidad de ventas de hoy
        const ventasHoy = yield venta_1.default.count({
            where: {
                fechaventa: { [sequelize_1.Op.between]: [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)] }
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
        const [productoMasVendido] = yield detalleventa_1.default.findAll({
            attributes: [
                'idproducto',
                [dbconexion_1.default.fn('sum', dbconexion_1.default.col('cantidad')), 'total']
            ],
            group: ['idproducto'],
            order: [[dbconexion_1.default.literal('total'), 'DESC']],
            limit: 1,
            include: [
                {
                    model: producto_1.default,
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
    }
    catch (error) {
        console.log(error); // Imprimir el error en la consola
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});
exports.getDashboard = getDashboard;
