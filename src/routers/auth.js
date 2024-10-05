import { Router } from "express";
import { validateBody } from "../middleware/validateBody.js";

import { registerUserSchema } from "../validation/auth";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUserController } from "../controllers/contacts";




const router = Router();

router.post("/register", validateBody(registerUserSchema), ctrlWrapper(registerUserController));


export default router;