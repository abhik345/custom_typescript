import { Router } from "express";

import {
  createGrandChildCategory,
  getGrandChildCategories,
  getGrandChildCategoryById,
  updateGrandChildCategoryById,
  deleteGrandChildCategoryById,
} from "../../../controllers/grand_child_category/grand_child_category.controller";
import { verifyToken } from "../../../middlewares/verifyToken";

const router = Router();

router.post("/create", verifyToken, createGrandChildCategory);
router.get("/get-all", getGrandChildCategories);
router.get("/get-all/:id", getGrandChildCategoryById);
router.put("/update/:id", verifyToken, updateGrandChildCategoryById);
router.delete("/delete/:id", verifyToken, deleteGrandChildCategoryById);

export default router;
