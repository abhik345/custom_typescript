import { Router } from "express";
import {createFabric,
    getFabrics,
    getfabricById,
    updatefabricById,
    deletefabricById
} from "../../../controllers/fabric/fabric.controller"
import { verifyToken } from "../../../middlewares/verifyToken";

    
const router = Router();


router.post("/create",verifyToken,createFabric);
router.get("/get-all",getFabrics);
router.get("/get-all/:id",getfabricById);
router.put("/update/:id",verifyToken,updatefabricById);
router.delete("/delete/:id",verifyToken,deletefabricById);


export default router;