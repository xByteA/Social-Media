import { v4 as uuidv4 } from "uuid"

import { prividerType, roleType } from "../../../../shared/enums";
import { IEncrypter } from "../../../../shared/utils/cryptography";
import { AppError } from "../../../../shared/utils/errors/AppError";
import { ICreateUserRepo } from "../../interfaces/ICreateUserRepo";
import { IGoogleProvider } from "../../interfaces/IGoogleProvider";

import type { ILogInDtoRes } from "../../dtos/response";

export class LogInGmailService {
    constructor(
        private readonly repo: ICreateUserRepo,
        private readonly googleProvider: IGoogleProvider,
        private readonly token: IEncrypter
    ){}
    async logInGmail(tokenId: string): Promise<ILogInDtoRes>{
        const googleData= await this.googleProvider.verifyToken(tokenId)
        const { name, email, email_verified, picture }= googleData
        // check user is exist
        let user= await this.repo.findByEmail(email)
        // 
        if (!user){
            // create user
            user= await this.repo.create({
                userName:name,
                email,
                confirmed:email_verified,
                provider: prividerType.google,
                image: picture!
            })
        }
        if (user?.provider != prividerType.google) throw new AppError("Please Login With other way")
        // create payload
        const payload = { id: user._id, email: user.email }
        // create access tpken
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
        return { access_token, refresh_token }
    }
}