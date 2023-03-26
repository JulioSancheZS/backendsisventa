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
exports.updateProducto = exports.deleteProducto = exports.postProducto = exports.getProductoPorId = exports.getProductos = void 0;
const producto_1 = __importDefault(require("../models/producto"));
const categoria_1 = __importDefault(require("../models/categoria"));
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield producto_1.default.findAll({
            include: [{
                    model: categoria_1.default,
                    attributes: ['nombre']
                }],
            attributes: ['idProducto', 'nombre', 'descripcion', 'precio', 'existencia', 'stockMinimo', 'stockMaximo', 'activo', 'fechaRegistro']
        });
        res.json(productos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener los productos' });
    }
});
exports.getProductos = getProductos;
const getProductoPorId = (red, response) => __awaiter(void 0, void 0, void 0, function* () {
    //destructurar 
    const { id } = red.params;
    const producto = yield producto_1.default.findByPk(id);
    if (producto) {
        response.json(producto);
    }
    else {
        response.status(404).json({
            msg: `No existe el producto con el ID ${id}`
        });
    }
});
exports.getProductoPorId = getProductoPorId;
//Agregar de producto
const postProducto = (res, response) => __awaiter(void 0, void 0, void 0, function* () {
    //destructurar 
    //destructurar
    const { idCategoria, nombre, descripcion, precio, existencia, stockMinimo, stockMaximo, activo } = res.body;
    //Agregar se hace con el create y le pasamos el body
    try {
        const currentDate = new Date(); //Fecha actual del servidor
        yield producto_1.default.create({
            idCategoria: idCategoria,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            existencia: existencia,
            fechaRegistro: currentDate,
            stockMaximo: stockMaximo,
            stockMinimo: stockMinimo,
            activo: activo
        });
        //Enviamos mensaje
        response.json({
            msg: 'El Producto fue agregada con exito',
        });
    }
    catch (error) {
        console.log(error);
        //Enviamos mensaje
        response.json({
            msg: 'Upps, ocurrio un error',
        });
    }
});
exports.postProducto = postProducto;
//Desactivar/Eliminar de producto por id
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        // Buscamos la producto por su ID
        const producto = yield producto_1.default.findByPk(id);
        if (!producto) {
            return res.status(404).json({
                msg: `No existe la categoria con el Id ${id}`
            });
        }
        // Actualizamos el campo activo a false
        yield producto.update({ activo: false });
        res.json({
            msg: `El Producto fue desactivada con exito`,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrio un error al desactivar el Producto',
        });
    }
});
exports.deleteProducto = deleteProducto;
//Editamos el producto por ID
const updateProducto = (res, response) => __awaiter(void 0, void 0, void 0, function* () {
    //destructurar 
    const { body } = res;
    const { id } = res.params; //obtenemos el id
    const producto = yield producto_1.default.findByPk(id);
    try {
        if (producto) {
            yield producto.update(body);
            response.json({
                msg: 'El Producto fue actualizado con exito',
            });
        }
        else {
            response.status(404).json({
                msg: `No existe el Producto con el Id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        //Enviamos mensaje
        response.json({
            msg: 'Upps, ocurrio un error al actualizar',
        });
    }
});
exports.updateProducto = updateProducto;
