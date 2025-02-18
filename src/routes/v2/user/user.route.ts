import {Router} from "express";
import {createUser,getAllUsers} from "../../../controllers/user/user.controller"

const router = Router();


router.post("/create",createUser);
router.get("/get-all",getAllUsers);


export default router;

