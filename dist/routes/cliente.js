"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_1 = require("../controllers/cliente");
const routes = (0, express_1.Router)();
routes.get('/', cliente_1.getCliente);
exports.default = routes;
