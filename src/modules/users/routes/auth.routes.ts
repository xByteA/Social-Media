import { Router } from "express";
import * as MD from "../../../shared/middleware/index";
import * as UV from "../validation/auth.validation";
import * as F from "../factory/index";
import { TokenType } from "../../../shared/enums/TokenTypes";

const userRouter = Router()
// signUp  
const signUpFactory = F.SignUpFactory()
userRouter.post("/signUp", MD.Validation(UV.signUpSchema), signUpFactory.handle)
// confirm email route
const confirmEmailFactory = F.ConfirmEmailFactory()
userRouter.patch("/confirmemail", MD.Validation(UV.confirmEmailSchema),confirmEmailFactory.handle)
// logIn
const logInFactory= F.LogInFactory()
userRouter.post("/login", MD.Validation(UV.logInSchema),logInFactory.handle)
// logOut
const logOutFactory= F.LogOutFactory()
userRouter.post("/logout", MD.Validation(UV.logOutSchema),MD.Authentication(),logOutFactory.handle)
// refreshToken
const refreshTokenFactory = F.RefreshTokenFactory()
userRouter.get("/refreshToken", MD.Validation(UV.refreshTokenSchema),MD.Authentication(TokenType.refresh),refreshTokenFactory.handle)
// logIn with Google
const logInGmailFactory= F.LogInGmailFactory()
userRouter.post("/loginWithGmail",logInGmailFactory.handle)

export default userRouter