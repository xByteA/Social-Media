import { userModel } from "../../../Infrastructure/DB/models/User/user.model";
import { DbUserRepository } from "../../../Infrastructure/DB/mongodb/repositories/User";
import { BcryptAdapter, jwtAdapter } from "../../../shared/utils/cryptography";
import { LogInController } from "../controller/auth/logIn";
import { logInService } from "../services/auth/logIn";



export function LogInFactory(){
    const repo= new DbUserRepository(userModel)
    const compare= new BcryptAdapter();
    const token= new jwtAdapter()
    const service= new logInService(repo,compare,token)
    return new LogInController(service);

}