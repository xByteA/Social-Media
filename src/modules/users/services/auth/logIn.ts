import { v4 as uuidv4 } from "uuid"

import { IFindByemail } from "../../../../Infrastructure/DB/mongodb/repositories/User/index";
import { roleType } from "../../../../shared/enums";
import { IComparer, IEncrypter } from "../../../../shared/utils/cryptography/index";
import { AppError } from "../../../../shared/utils/errors/AppError";
import * as DT from "../../dtos/request/index";

import type{ ILogInDtoRes } from "../../dtos/response/index";
import type{ ILognInService } from "../../interfaces/ILogInService";


export class logInService implements ILognInService {
    constructor (
        private readonly Repo: IFindByemail,
        private readonly compare: IComparer,
        private readonly token: IEncrypter
    ){}
    async logIn(data: DT.ILogInDtoReq): Promise<ILogInDtoRes> {
        const {email, password}= data
        // check user email
        const userExists= await this.Repo.findByEmail(email)
        if (!userExists || userExists.confirmed== false){
            throw new AppError("Email not confirmed or not exist", 401);
        }
        // verify password
        const checkPassword = await this.compare.compare(password, userExists?.password)
        if (!checkPassword){
            throw new AppError("invalid password", 401);
        }
        const payload = { id: userExists._id, email: userExists.email }
        // create access tpken
        const access_token = await this.token.encrypt({
            payload,
            signature: userExists.role == roleType.user ? process.env.ACCESS_TOKEN_USER! : process.env.ACCESS_TOKEN_ADMIN!,
            options: { expiresIn: 60 * 60 , jwtid:uuidv4() } 
        });
        // create refresh token
        const refresh_token = await this.token.encrypt({
            payload,
            signature: userExists.role == roleType.user ? process.env.REFRESH_TOKEN_USER! : process.env.REFRESH_TOKEN_ADMIN!,
            options: { expiresIn: "1y", jwtid: uuidv4() }
        });
        return {access_token,refresh_token}
    }
}