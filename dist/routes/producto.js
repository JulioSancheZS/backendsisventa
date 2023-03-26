"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_1 = require("../controllers/producto");
const validate_token_1 = __importDefault(require("./validate-token"));
const routes = (0, express_1.Router)();
routes.get('/', validate_token_1.default, producto_1.getProductos);
routes.get('/:id', producto_1.getProductoPorId);
routes.post('/', producto_1.postProducto);
routes.put('/desactivar/:id', producto_1.deleteProducto);
routes.put('/actualizar/:id', producto_1.updateProducto);
exports.default = routes;
