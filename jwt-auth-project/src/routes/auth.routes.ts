import { Router } from "express";
import { register, login,profile} from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/profile",authenticateToken,profile)
export default router;
