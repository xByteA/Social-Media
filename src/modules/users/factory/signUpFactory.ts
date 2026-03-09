import { userModel } from "../../../Infrastructure/DB/models/User/user.model";
import { DbUserRepository } from "../../../Infrastructure/DB/mongodb/repositories/User";
import { EmailEventBus } from "../../../Infrastructure/email/emailEvents";
import { NodemailerService } from "../../../Infrastructure/email/nodeMailerService";
import { BcryptAdapter } from "../../../shared/utils/cryptography/bcrypt-adapter";
import { SignUpController } from "../controller/auth/signUp";
import { SignUpService } from "../services/auth/signUp";


// Factory function creating configrations for SignUpController
export function SignUpFactory() {
    const repo = new DbUserRepository(userModel);
    const hasher = new BcryptAdapter(12);
    const emailService = new NodemailerService();
    const eventBus = new EmailEventBus(emailService)
    const userService=new SignUpService(repo, hasher, emailService, eventBus);
    return new SignUpController(userService)
}