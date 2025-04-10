import { Router } from "express";
import { getAllUsers ,createUser,deleteUser} from "../controllers/user.controller";
import { createUserSchema, deleteUserSchema } from "../schema/user.schema";
import validate from "../middlewares/validate.middleware";
import { validateDeleteQuery } from "../middlewares/validate.middleware";
const router = Router();
router.get("/", getAllUsers);
router.post("/",validate(createUserSchema),createUser)
router.delete("/",validateDeleteQuery(deleteUserSchema),deleteUser)
export default router;
