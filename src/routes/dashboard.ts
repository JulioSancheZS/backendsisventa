import { Router } from "express";
import { getDashboard } from "../controllers/dashboard";

const routes = Router();

routes.get('/',getDashboard)

export default routes