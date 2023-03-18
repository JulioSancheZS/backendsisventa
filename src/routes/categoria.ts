import { Router } from "express";
import { deleteCategoria, getCategoria, getCategoriaPorId, postCategoria, updateCategoria } from "../controllers/categoria";

const routes = Router();

routes.get('/', getCategoria)
routes.get('/:id', getCategoriaPorId)
//routes.put('/:id', deleteCategoria)
routes.post('/', postCategoria)
//routes.put('/:id', updateCategoria)
routes.put('/actualizar/:id', updateCategoria);
routes.put('/desactivar/:id', deleteCategoria);

export default routes