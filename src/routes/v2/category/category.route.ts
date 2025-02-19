import { Router } from "express";
import {createCategory,getCategories} from "../../../controllers/category/category.controller"
import { base64ToSingleImage } from "../../../middlewares/base64ToSingleImage";


const router = Router();

router.post("/create",base64ToSingleImage,createCategory);
router.get("/get-all",getCategories);




export default router;