"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const venta_1 = require("../controllers/venta");
const routes = (0, express_1.Router)();
routes.post('/', venta_1.postVenta);
exports.default = routes;
