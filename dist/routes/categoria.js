"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoria_1 = require("../controllers/categoria");
const routes = (0, express_1.Router)();
routes.get('/', categoria_1.getCategoria);
routes.get('/:id', categoria_1.getCategoriaPorId);
//routes.put('/:id', deleteCategoria)
routes.post('/', categoria_1.postCategoria);
//routes.put('/:id', updateCategoria)
routes.put('/actualizar/:id', categoria_1.updateCategoria);
routes.put('/desactivar/:id', categoria_1.deleteCategoria);
exports.default = routes;
