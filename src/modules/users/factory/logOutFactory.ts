import { revokeTokenModel } from "../../../Infrastructure/DB/models/Revoke/revokeTokens";
import { DbRevokeTokenRepository } from "../../../Infrastructure/DB/mongodb/repositories/revokeToken";
import { LogOutController } from "../controller/auth/logOut";
import { LogOutService } from "../services/auth/logOut";




export function LogOutFactory(){
    const repo= new DbRevokeTokenRepository(revokeTokenModel)
    
    const service = new LogOutService(repo)
    return new LogOutController(service);

}