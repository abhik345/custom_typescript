import { Router } from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProdcutById,
    deleteProductById
} from "../../../controllers/product/product.controller";
import { verifyToken } from "../../../middlewares/verifyToken";


const router = Router();


router.post("/create",verifyToken, createProduct);
router.get("/get-all", getProducts);
router.get("/get-all/:id", getProductById);
router.put("/update/:id",verifyToken, updateProdcutById);
router.delete("/delete/:id",verifyToken, deleteProductById);


export default router;