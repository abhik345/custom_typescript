import { Router } from "express";

import {
    createColor,
    getColors,
    getColorById,
    updateColorById,
    deleteColorById
} from "../../../controllers/color/color.controller"
import { verifyToken } from "../../../middlewares/verifyToken";

const router = Router();

router.post("/create",verifyToken, createColor);
router.get("/get-all",getColors);
router.get("/get/:id",getColorById);
router.put("/update/:id",verifyToken, updateColorById);
router.delete("/delete/:id",verifyToken, deleteColorById);


export default router;