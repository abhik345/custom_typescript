
import {Router} from "express";
import {createUser,getAllUsers,getUserById,updateUserById,deleteById} from "../../../controllers/user/user.controller"

const router = Router();


router.post("/create",createUser);
router.get("/get-all",getAllUsers);
router.get("/get-all/:id",getUserById);
router.put("/update/:id",updateUserById);
router.delete("/delete/:id",deleteById);



export default router;

