import { Router } from "express"
import { getEmployees } from '../controllers/employee.controller';
export const router=Router();
router.get('/',getEmployees);
export default router;