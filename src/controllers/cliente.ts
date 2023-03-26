import { Request, Response } from 'express'
import Cliente from '../models/cliente';

export const getCliente = async (req: Request, res: Response) => {

    try {
        // Listado 
    const listaCliente = await Cliente.findAll();
    
    res.json(listaCliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el listado de clientes' });
    }
}


