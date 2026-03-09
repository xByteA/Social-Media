import { userModel } from "../../../Infrastructure/DB/models/User/user.model";
import { DbUserRepository } from "../../../Infrastructure/DB/mongodb/repositories/User";
import { jwtAdapter } from "../../../shared/utils/cryptography";
import { LogInGmailController } from "../controller/auth/logInGmail";
import { GoogleProvider } from "../providers/google.provider";
import { LogInGmailService } from "../services/auth/logInGmail";




export function LogInGmailFactory(){
    const repo= new DbUserRepository(userModel)
    const token= new jwtAdapter()
    const googleProvider= new GoogleProvider()
    const service= new LogInGmailService(repo,googleProvider,token)
    return new LogInGmailController(service);

}