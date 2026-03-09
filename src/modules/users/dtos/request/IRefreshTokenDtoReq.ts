import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../../../../Infrastructure/DB/models/User/IUser";

export interface IRefreshTokenDtoReq {
    user: IUser,
    token:JwtPayload
}