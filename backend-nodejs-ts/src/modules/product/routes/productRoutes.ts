import { Router } from "express";
import {findAll, findById} from "../controllers/ProductController";
export const productRouter = Router();

productRouter.get('/', findAll);
productRouter.get('/:id', findById);


