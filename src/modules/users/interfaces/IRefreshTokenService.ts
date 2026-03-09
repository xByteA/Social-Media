import { IRefreshTokenDtoReq } from "../dtos/request/IRefreshTokenDtoReq";
import { IRefreshTokenDtoRes } from "../dtos/response/IRefreshTokenDtoRes";

export interface IRefreshTokenService {
    refreshToken:(user: IRefreshTokenDtoReq)=>Promise<IRefreshTokenDtoRes>
} 