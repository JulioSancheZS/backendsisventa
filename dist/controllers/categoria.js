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
exports.updateCategoria = exports.postCategoria = exports.deleteCategoria = exports.getCategoriaPorId = exports.getCategoria = void 0;
const categoria_1 = __importDefault(require("../models/categoria"));
//Listado de categorias
const getCategoria = (res, response) => __awaiter(void 0, void 0, void 0, function* () {
    //Listado 
    const listaCategoria = yield categoria_1.default.findAll();
    response.json(listaCategoria);
    /*
        response.json({
          msg: "Listado de categoria"
      })
    */
});
exports.getCategoria = getCategoria;
//Categoria por id
const getCategoriaPorId = (red, response) => __awaiter(void 0, void 0, void 0, function* () {
    //destructurar 
    const { id } = red.params;
    const categoria = yield categoria_1.default.findByPk(id);
    if (categoria) {
        response.json(categoria);
    }
    else {
        response.status(404).json({
            msg: `No existe la categoria con el ID ${id}`
        });
    }
});
exports.getCategoriaPorId = getCategoriaPorId;
//Desactivar/Eliminar de categorias por id
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        // Buscamos la categoría por su ID
        const categoria = yield categoria_1.default.findByPk(id);
        if (!categoria) {
            return res.status(404).json({
                msg: `No existe la categoria con el Id ${id}`
            });
        }
        // Actualizamos el campo activo a false
        yield categoria.update({ activo: false });
        res.json({
            msg: 'La categoria fue desactivada con exito',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrio un error al desactivar la categoria',
        });
    }
});
exports.deleteCategoria = deleteCategoria;
//Agregar de categorias por id
const postCategoria = (res, response) => __awaiter(void 0, void 0, void 0, function* () {
    //destructurar 
    const { body } = res;
    //Agregar se hace con el create y le pasamos el body
    try {
        yield categoria_1.default.create(body);
        //Enviamos mensaje
        response.json({
            msg: 'La categoria fue agregada con exito',
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
exports.postCategoria = postCategoria;
//Agregar de categorias por id
const updateCategoria = (res, response) => __awaiter(void 0, void 0, void 0, function* () {
    //destructurar 
    const { body } = res;
    const { id } = res.params; //obtenemos el id
    const categoria = yield categoria_1.default.findByPk(id);
    try {
        if (categoria) {
            yield categoria.update(body);
            response.json({
                msg: 'El categoria fue actualizado con exito',
            });
        }
        else {
            response.status(404).json({
                msg: `No existe un categoria con el Id ${id}`
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
exports.updateCategoria = updateCategoria;
