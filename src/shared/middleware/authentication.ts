import type { NextFunction, Request, Response } from "express"

import { roleType } from "../enums"
import { AppError } from "../utils/errors/AppError"
import { jwtAdapter } from "../utils/cryptography"
import { DbUserRepository } from "../../Infrastructure/DB/mongodb/repositories/User"
import { userModel } from "../../Infrastructure/DB/models/User/user.model"
import { DbRevokeTokenRepository } from "../../Infrastructure/DB/mongodb/repositories/revokeToken"
import { revokeTokenModel } from "../../Infrastructure/DB/models/Revoke/revokeTokens"
import { TokenType } from "../enums/TokenTypes"




const getSignature= async (tokenType:TokenType, prefix:string)=> {
    if (tokenType===TokenType.access && prefix=== roleType.user){
        return process.env.ACCESS_TOKEN_USER as string
    }
    else if (tokenType===TokenType.access && prefix===roleType.admin){
        return process.env.ACCESS_TOKEN_ADMIN as string
    }
    else if (tokenType===TokenType.refresh && prefix===roleType.user){
        return process.env.REFRESH_TOKEN_USER as string
    }
    else if (tokenType===TokenType.refresh && prefix=== roleType.admin){
        return process.env.REFRESH_TOKEN_ADMIN as string
    }
    else return null
}

const jwt= new jwtAdapter();
const userRepo = new DbUserRepository(userModel);
const revokeRepo= new DbRevokeTokenRepository(revokeTokenModel)

export const Authentication=(tokenType: TokenType = TokenType.access)=>{
    return async (req: Request, res: Response, next: NextFunction) => {
        const { authorization } = req.headers
        if (!authorization) throw new AppError("login please")
        const [prefix, token] = authorization.split(" ") || []

        if (!prefix || !token) throw new AppError("Invalid token", 401)

        const signature = await getSignature(tokenType, prefix)
        if (!signature) throw new AppError("Invalid token", 401)

        const decode: any = await jwt.decrypt({ token, signature })
        if (!decode.id) throw new AppError("invalid payload", 401)

        const user = await userRepo.findById(decode.id)
        if (!user) throw new AppError("please signUp first", 404)

        const revokeExists = await revokeRepo.findOne(decode.jti);
        if (revokeExists) throw new AppError("token is not valid", 401)
        req.loggedInUser = { user, token: decode }
        
        next()
    }

}
