import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'

const ValidateToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers['authorization']
  console.log(headerToken)

  if (headerToken != undefined && headerToken.startsWith('Bearer ')){
    //Tiene token
    try {
        const BearerToken = headerToken.slice(7);
        //Verificamos token
        jwt.verify(BearerToken, process.env.SECRET_KEY || 'julio134');
    
        next();
    } catch (error) {
        res.status(401).json({
            msg: "Token no valido"
        })
    }
   
  }else{
    res.status(401).json({
        msg: "Acceso Denegado"
    })
  }
}

export default ValidateToken