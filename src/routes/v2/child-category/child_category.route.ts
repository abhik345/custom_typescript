import { verifyToken } from "./../../../middlewares/verifyToken";
import { Router } from "express";

import {
  createChildCategory,
  getAllChildCategories,
  getChildCategoryById,
  updateChildCategoryById,
  deleteChildCategoryById,
} from "../../../controllers/child_category/child_category.controller";

const router = Router();

router.post("/create", verifyToken, createChildCategory);
router.get("/get-all", getAllChildCategories);
router.get("/get-all/:id", getChildCategoryById);
router.put("/update/:id", verifyToken, updateChildCategoryById);
router.delete("/delete/:id", verifyToken, deleteChildCategoryById);

export default router;
