import { Router } from "express";
import { deleteProducto, getProductoPorId, getProductos, postProducto, updateProducto } from "../controllers/producto";
import ValidateToken from "./validate-token";

const routes = Router();

routes.get('/', ValidateToken, getProductos)
routes.get('/:id', getProductoPorId)
routes.post('/', postProducto)
routes.put('/desactivar/:id', deleteProducto);
routes.put('/actualizar/:id', updateProducto);

export default routes