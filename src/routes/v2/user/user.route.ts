import { verifyToken } from './../../../middlewares/verifyToken';

import {Router} from "express";
import {createUser,getAllUsers,getUserById,updateUserById,deleteById} from "../../../controllers/user/user.controller"

const router = Router();


router.post("/create",verifyToken,createUser);
router.get("/get-all",verifyToken,getAllUsers);
router.get("/get-all/:id",verifyToken,getUserById);
router.put("/update/:id",verifyToken,updateUserById);
router.delete("/delete/:id",verifyToken,deleteById);



export default router;

