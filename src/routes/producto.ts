import { Router } from "express";
import { deleteProducto, getProductoPorId, getProductos, postProducto, updateProducto } from "../controllers/producto";

const routes = Router();

routes.get('/', getProductos)
routes.get('/:id', getProductoPorId)
routes.post('/', postProducto)
routes.put('/desactivar/:id', deleteProducto);
routes.put('/actualizar/:id', updateProducto);

export default routes