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
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = __importDefault(require("../models/usuario"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const rol_1 = __importDefault(require("../models/rol"));
const newUser = (res, response) => __awaiter(void 0, void 0, void 0, function* () {
    //destructurar
    const { idrol, nombre, login, password, correo, telefono, fecharegistro, activo, } = res.body;
    //Validar si el usuario ya existe
    const user = yield usuario_1.default.findOne({ where: { login: login } });
    const correos = yield usuario_1.default.findOne({ where: { correo: correo } });
    if (user) {
        return response.status(400).json({
            msg: `Ya existe un usuario con el login: ${login} `
        });
    }
    if (correos) {
        return response.status(400).json({
            msg: `Ya existe un usuario con el corre: ${correo} `
        });
    }
    console.log("sigo");
    //Encriptar contraseña
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    //fecha del servidor
    const currentDate = new Date();
    try {
        //Guardamos usuario en la db
        yield usuario_1.default.create({
            idrol: idrol,
            nombre: nombre,
            login: login,
            password: hashPassword,
            correo: correo,
            telefono: telefono,
            fecharegistro: currentDate,
            activo: activo
        });
        response.json({
            msg: `Usuario ${login} creado exitosamente`
        });
    }
    catch (error) {
        response.status(400).json({
            msg: 'Upps, Ocurrio un error',
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (res, response) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(res.body);
    const { login, password } = res.body;
    const user = yield usuario_1.default.findOne({
        where: { login: login },
        include: { model: rol_1.default, attributes: ['nombrerol'] }, // incluir la tabla de roles en la consulta y solo obtener el campo 'nombre'
    });
    //Validamos si el usuario existe en la db
    if (!user) {
        return response.status(400).json({
            msg: `No existe un usuario con el login ${login} en la base de datos`
        });
    }
    //Validamos pass
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return response.status(400).json({
            msg: `Contraseña Incorrecta`
        });
    }
    //Generamos token
    const token = jsonwebtoken_1.default.sign({
        login: login,
        idusuario: user.id,
        nombreRol: user.rol.nombrerol // acceder al nombre del rol desde el objeto de usuario incluido
    }, process.env.SECRET_KEY || 'julio134');
    response.json(token);
});
exports.loginUser = loginUser;
