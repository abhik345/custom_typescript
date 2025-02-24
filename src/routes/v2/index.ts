import { Router } from "express";
import roleRoutes from "./role/role.route";
import userRoutes from "./user/user.route";
import authRoutes from "./auth/auth.route";
import categoryRoutes from "./category/category.route";
import subCategoryRoutes from "./sub-category/sub_category.route";
import childCategoryRoutes from "./child-category/child_category.route";
import grandChildCtaegoryRoute from "./grand-child-category/grand_child_category.route";
import colorRoutes from "./color/color.route";
import fabricRoutes from "./fabric/fabric.route";
import productRoutes from "./product/product.route";

const router = Router();



router.use("/roles",roleRoutes);
router.use("/users",userRoutes);
router.use("/auth",authRoutes);
router.use("/categories",categoryRoutes);
router.use("/sub-categories",subCategoryRoutes);
router.use("/child-categories",childCategoryRoutes);
router.use("/grand-child-categories",grandChildCtaegoryRoute);
router.use("/colors",colorRoutes);
router.use("/fabrics",fabricRoutes);
router.use("/products",productRoutes);


export default router;

