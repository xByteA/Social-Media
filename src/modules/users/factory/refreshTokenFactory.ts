import { revokeTokenModel } from "../../../Infrastructure/DB/models/Revoke/revokeTokens";
import { DbRevokeTokenRepository } from "../../../Infrastructure/DB/mongodb/repositories/revokeToken";
import { jwtAdapter } from "../../../shared/utils/cryptography";
import { RefreshTokenController } from "../controller/auth/refreshToken";
import { RefreshTokenService } from "../services/auth/refreshToken";


export function RefreshTokenFactory(){
    const jwt = new jwtAdapter();
    const repo= new DbRevokeTokenRepository(revokeTokenModel) 
    const service= new RefreshTokenService(jwt,repo);
    return new RefreshTokenController(service)
}