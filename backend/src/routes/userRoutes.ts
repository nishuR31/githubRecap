import { Router } from "express";
import editUser from "../controllers/user/editUserController";
const router = Router();
router.put("/edit", editUser);
export default router;
