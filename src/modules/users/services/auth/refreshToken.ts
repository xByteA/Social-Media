import { v4 as uuidv4 } from "uuid";
import { roleType } from "../../../../shared/enums";
import { IEncrypter } from "../../../../shared/utils/cryptography";
import { IRefreshTokenDtoReq } from "../../dtos/request/IRefreshTokenDtoReq";
import { IRefreshTokenDtoRes } from "../../dtos/response/IRefreshTokenDtoRes";
import { ICreateRevokeToken } from "../../../../Infrastructure/DB/mongodb/repositories/revokeToken";
import { AppError } from "../../../../shared/utils/errors/AppError";

export class RefreshTokenService{
    constructor(
        private readonly token:IEncrypter,
        private readonly repo: ICreateRevokeToken
    ) {}

    async refreshToken(data: IRefreshTokenDtoReq): Promise<IRefreshTokenDtoRes> {
        const {user, token}= data

        const payload = { id: user._id, email: user.email }
        // create access token
        const access_token = await this.token.encrypt({
            payload,
            signature: user.role == roleType.user ? process.env.ACCESS_TOKEN_USER! : process.env.ACCESS_TOKEN_ADMIN!,
            options: { expiresIn: 60 * 60, jwtid: uuidv4() }
        });
        // create refresh token
        const refresh_token = await this.token.encrypt({
            payload,
            signature: user.role == roleType.user ? process.env.REFRESH_TOKEN_USER! : process.env.REFRESH_TOKEN_ADMIN!,
            options: { expiresIn: "1y", jwtid: uuidv4() }
        });

        const expireAt = new Date(Number(token.exp) * 1000)
        const revokeToken = await this.repo.create({ userId: user._id, tokenId: token.jti!, expireAt })
        if (!revokeToken) throw new AppError("Failed to revoke token", 500);
        return { access_token, refresh_token }
    }
}
