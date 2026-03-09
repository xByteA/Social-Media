import { userModel } from "../../../Infrastructure/DB/models/User/user.model";
import { DbUserRepository } from "../../../Infrastructure/DB/mongodb/repositories/User";
import { BcryptAdapter } from "../../../shared/utils/cryptography/bcrypt-adapter";
import { ConfirmEmailController } from "../controller/auth/confirmEmail";
import { ConfirmEmailService } from "../services/auth/confirmEmail";



export function ConfirmEmailFactory(){
    const repo= new DbUserRepository(userModel)
    const comparer = new BcryptAdapter()
    const service= new ConfirmEmailService(comparer, repo)
    return new ConfirmEmailController(service) 
}