import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../../../../Infrastructure/DB/models/User/IUser";

export interface ILogOutDtoReq {
    user: IUser,
    token:JwtPayload
}