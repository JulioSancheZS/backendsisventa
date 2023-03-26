import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Usuario from '../models/usuario';
import jwt from 'jsonwebtoken';
import Rol from '../models/rol';

export const newUser = async (res: Request, response: Response) => {
    //destructurar
    const { idrol,
        nombre,
        login,
        password,
        correo,
        telefono,
        activo,
    } = res.body;

    //Validar si el usuario ya existe
    const user = await Usuario.findOne({ where: { login: login } })
    const correos = await Usuario.findOne({ where: { correo: correo } })

    if (user) {
        return response.status(400).json({
            msg: `Ya existe un usuario con el login: ${login} `
        })
    }

    if (correos) {
        return response.status(400).json({
            msg: `Ya existe un usuario con el corre: ${correo} `
        })
    }

    console.log("sigo")
    //Encriptar contraseña
    const hashPassword = await bcrypt.hash(password, 10)

    //fecha del servidor
    const currentDate = new Date();

    try {
        //Guardamos usuario en la db
        await Usuario.create({
            idrol: idrol,
            nombre: nombre,
            login: login,
            password: hashPassword,
            correo: correo,
            telefono: telefono,
            fechaRegistro: currentDate,
            activo: activo
        })

        response.json({
            msg: `Usuario ${login} creado exitosamente`
        })
    } catch (error) {
        response.status(400).json({
            msg: 'Upps, Ocurrio un error',
            error
        })
    }
}

export const loginUser = async (res: Request, response: Response) => {

    //console.log(res.body);
    const { login, password } = res.body;
    const user: any = await Usuario.findOne({
        where: { login: login },
        include: { model: Rol, attributes: ['nombrerol'] }, // incluir la tabla de roles en la consulta y solo obtener el campo 'nombre'
      });

    //Validamos si el usuario existe en la db
    if (!user) {
        return response.status(400).json({
            msg: `No existe un usuario con el login ${login} en la base de datos`
        })
    }
    //Validamos pass
    const passwordValid = await bcrypt.compare(password, user.password);
    
    if (!passwordValid) {
        return response.status(400).json({
            msg: `Contraseña Incorrecta`
        })
    }
    //Generamos token
    const token = jwt.sign({
        login: login,
        idusuario: user.id,
        nombreRol: user.rol.nombrerol// acceder al nombre del rol desde el objeto de usuario incluido
    }, process.env.SECRET_KEY || 'julio134');

    response.json(token);
}