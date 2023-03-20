"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
const routes = (0, express_1.Router)();
routes.post('/', usuario_1.newUser);
routes.post('/login', usuario_1.loginUser);
exports.default = routes;
