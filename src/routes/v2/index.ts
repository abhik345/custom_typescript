import { Router } from "express";
import roleRoutes from "./role/role.route";
import userRoutes from "./user/user.route";
import authRoutes from "./auth/auth.route";

const router = Router();



router.use("/roles",roleRoutes);
router.use("/users",userRoutes);
router.use("/auth",authRoutes);


export default router;

