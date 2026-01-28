import { IComparer } from "../../../../shared/utils/cryptography/IComparer";
import { AppError } from "../../../../shared/utils/errors/AppError";
import { IconfirmEmailDto } from "../../dtos/request/ConfirmEmailDtoReq";
import { IConfirmEmailRepo } from "../../interfaces/IConfirmEmailRepo";


export class ConfirmEmailService {
    constructor(private comparer: IComparer,
        private repo: IConfirmEmailRepo
    ) {}

    async confirmEmail(data: IconfirmEmailDto): Promise<string>{
        const {email, otp}= data
        const userExists = await this.repo.findByEmail(email)
        if (!userExists || userExists.confirmed===true) {
            throw new AppError("Email already confirmed or not exist", 409);
        }
        // compre otp
        const compared= await this.comparer.compare(otp,userExists?.otp!)
        if (! compared){
            throw new AppError("Invalid otp", 400)
        }
        // update confirmation
        await this.repo.updateOne({email}, {confirmed:true, otp: null})
        return "Email confirmed successfully"
    }

}

// const confirm= (data: any)=>{
//     const {email, otp}= data
//     // findByEmail $ confirmed
//     // compare otp
// }