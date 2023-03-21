"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ValidateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    console.log(headerToken);
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //Tiene token
        try {
            const BearerToken = headerToken.slice(7);
            //Verificamos token
            jsonwebtoken_1.default.verify(BearerToken, process.env.SECRET_KEY || 'julio134');
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: "Token no valido"
            });
        }
    }
    else {
        res.status(401).json({
            msg: "Acceso Denegado"
        });
    }
};
exports.default = ValidateToken;
