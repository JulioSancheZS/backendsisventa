import { Router } from "express";
import {  loginUser, newUser } from "../controllers/usuario";

const routes = Router();

routes.post('/', newUser)
routes.post('/login', loginUser)

export default routes