import { Request } from "express";
import { IUser } from "../../models/User/IUser";
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            loggedInUser?: {
                user: IUser;
                token: JwtPayload;
            };
        }
    }
}
