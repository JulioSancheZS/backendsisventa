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
exports.postVenta = void 0;
const detalleventa_1 = __importDefault(require("../models/detalleventa"));
const venta_1 = __importDefault(require("../models/venta"));
const dbconexion_1 = __importDefault(require("../db/dbconexion"));
const postVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const detalles = body.detalles;
    const t = yield dbconexion_1.default.transaction();
    try {
        const venta = yield venta_1.default.create({
            idcliente: body.idcliente,
            idusuario: body.idusuario,
            idestado: body.idestado,
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
        yield detalleventa_1.default.bulkCreate(detallesVenta, { transaction: t });
        yield t.commit();
        res.status(201).json({
            ok: true,
            msg: 'Venta creada correctamente',
            venta,
        });
    }
    catch (error) {
        yield t.rollback();
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la venta',
        });
    }
});
exports.postVenta = postVenta;
