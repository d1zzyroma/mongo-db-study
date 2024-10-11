import { Router } from "express";
import { validateBody } from "../middleware/validateBody.js";

import { registerUserSchema, requestResetEmailSchema } from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { logoutUserController, registerUserController, requestResetEmailController } from "../controllers/auth.js";
import { loginUserSchema} from '../validation/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { refreshUserSessionController } from '../controllers/auth.js';


const authRouter = Router();

authRouter.post("/register", validateBody(registerUserSchema), ctrlWrapper(registerUserController));
authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController),);
authRouter.post("/logout", ctrlWrapper(logoutUserController));
authRouter.post("/refresh", ctrlWrapper(refreshUserSessionController));
authRouter.post('/request-reset-email',validateBody(requestResetEmailSchema),ctrlWrapper(requestResetEmailController));

export default authRouter;