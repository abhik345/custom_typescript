import { Router } from "express";
import { createRole, getAllRoles, updateRoleById, deleteRoleById } from "../../../controllers/role/role.controller"



const router = Router();


router.post("/create", createRole );
router.get("/get-all", getAllRoles );
router.put("/update/:id", updateRoleById);
router.delete("/delete/:id", deleteRoleById);


export default router;