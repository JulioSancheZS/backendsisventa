import { Router } from "express";
import { getCliente } from "../controllers/cliente";


const routes = Router();

routes.get('/',getCliente)

export default routes