import { Router } from "express";
import { postVenta } from "../controllers/venta";

const routes = Router();

routes.post('/', postVenta)

export default routes