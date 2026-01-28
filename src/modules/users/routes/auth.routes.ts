import { Router } from "express";
import * as MD from "../../../shared/middleware/Validation";
import * as UV from "../validation/auth.validation";
import { SignUpFactory } from "../factory/signUpFactory";
import { ConfirmEmailFactory } from "../factory/confirmEmailFactory";

const userRouter = Router()
// signUp  
const signUpFactory = SignUpFactory()
userRouter.post("/signUp", MD.Validation(UV.signUpSchema), signUpFactory.handle)
// confirm email route
const confirmEmailFactory = ConfirmEmailFactory()
userRouter.patch("/confirmemail", confirmEmailFactory.handle)


export default userRouter 


