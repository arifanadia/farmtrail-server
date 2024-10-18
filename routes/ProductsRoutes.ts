import { Router } from "express";
import { getAllProducts } from "../controllers/ProductsController";


const productsRouter = Router();

productsRouter.get('/products',getAllProducts);

export default productsRouter;