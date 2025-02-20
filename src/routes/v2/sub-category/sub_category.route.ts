import { Router } from "express";

import {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategoryById,
  deleteSubCategoryById,
} from "../../../controllers/sub_category/sub_category.controller";
import { base64ToSingleImage } from "../../../middlewares/base64ToSingleImage";




const router = Router();



router.post("/create", base64ToSingleImage, createSubCategory);
router.get("/get-all", getAllSubCategories);
router.get("/get-all/:id", getSubCategoryById);
router.put("/update/:id", base64ToSingleImage, updateSubCategoryById);
router.delete("/delete/:id", deleteSubCategoryById);


export default router;




