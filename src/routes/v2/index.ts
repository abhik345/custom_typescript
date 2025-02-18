import { Router } from "express";
import roleRoutes from "./role/role.route";
import userRoutes from "./user/user.route";



const router = Router();



router.use("/roles",roleRoutes);
router.use("/users",userRoutes);


export default router;

