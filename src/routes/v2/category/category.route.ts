import { Router } from "express";
import {createCategory,getCategories,getCategoryById,updateCategoryById,deleteCategoryById} from "../../../controllers/category/category.controller"
import { base64ToSingleImage } from "../../../middlewares/base64ToSingleImage";


const router = Router();

router.post("/create",base64ToSingleImage,createCategory);
router.get("/get-all",getCategories);
router.get("/get-all/:id",getCategoryById);
router.put("/update/:id",base64ToSingleImage,updateCategoryById);
router.delete("/delete/:id",deleteCategoryById);




export default router;