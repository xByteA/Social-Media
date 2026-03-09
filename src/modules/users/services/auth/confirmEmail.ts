import { IComparer } from "../../../../shared/utils/cryptography/IComparer";
import { AppError } from "../../../../shared/utils/errors/AppError";
import { IconfirmEmailDtoReq } from "../../dtos/request/index";
import { IConfirmEmailRepo } from "../../interfaces/IConfirmEmailRepo";
import { IConfirmEmailService } from "../../interfaces/IConfirmEmailService";


export class ConfirmEmailService implements IConfirmEmailService {
    constructor(private comparer: IComparer,
        private repo: IConfirmEmailRepo
    ) {}

    async confirmEmail(data: IconfirmEmailDtoReq): Promise<string>{
        const {email, otp}= data
        const userExists = await this.repo.findByEmail(email)
        if (!userExists || userExists.confirmed===true) {
            throw new AppError("Email already confirmed or not exist", 404);
        }
        // compre otp
        const compared= await this.comparer.compare(otp,userExists?.otp!)
        if (!compared){
            throw new AppError("Invalid otp", 400)
        }
        // update confirmation
        await this.repo.updateOne({email}, {confirmed:true, otp: null})
        return "Email confirmed successfully"
    }

}
