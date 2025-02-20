import { Router } from "express";
import roleRoutes from "./role/role.route";
import userRoutes from "./user/user.route";
import authRoutes from "./auth/auth.route";
import categoryRoutes from "./category/category.route";
import subCategoryRoutes from "./sub-category/sub_category.route";

const router = Router();



router.use("/roles",roleRoutes);
router.use("/users",userRoutes);
router.use("/auth",authRoutes);
router.use("/categories",categoryRoutes);
router.use("/sub-categories",subCategoryRoutes);


export default router;

