import { ICreateRevokeToken } from "../../../../Infrastructure/DB/mongodb/repositories/revokeToken/ICreateRevokeToken";
import { AppError } from "../../../../shared/utils/errors/AppError";
import * as DT from "../../dtos/request/index";


export class LogOutService{
    constructor(
        private readonly repo:ICreateRevokeToken 
    ){}
    
    async logOut(data: DT.ILogOutDtoReq):Promise<string>{
        const {user, token}= data 
        const expireAt= new Date(Number(token.exp)* 1000)
        const revokeToken= await this.repo.create({userId:user._id,tokenId:token.jti!,expireAt} )
        if (!revokeToken) throw new AppError("Failed to revoke token", 500);
        return "Token revoked successfully";
    }
}