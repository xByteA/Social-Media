import { EmailEventBus } from "../../../../Infrastructure/email/emailEvents";
import { IEmailService } from "../../../../Infrastructure/email/IEmailService";
import { IHasher } from "../../../../shared/utils/cryptography/IHasher";
import { AppError } from "../../../../shared/utils/errors/AppError";
import { ISignUpDtoReq } from "../../dtos/request/SignUpDtoReq";
import { ISignUpDtoRes } from "../../dtos/response/SignUpDtoRes";
import { ICreateUserRepo } from "../../interfaces/ICreateUserRepo";
import { ISignUpService } from "../../interfaces/ISignUpService";


export class SignUpService implements ISignUpService{
    constructor(
        private repo: ICreateUserRepo,
        private hasher: IHasher,
        private emailService: IEmailService,
        private eventBus: EmailEventBus) {}

    async createUser(data: ISignUpDtoReq): Promise<ISignUpDtoRes> {
        const { fName, lName, email, password, age, phone, address, gender, role } = data;
        // check duplicate
        const emailExists = await this.repo.findByEmail(email);
        if (emailExists) {
            throw new AppError("Email already registered. Please use a different email or try logging in.", 409);
        }
        //hash password 
        const hash = await this.hasher.hash(password)
        // generate otp
        const otp= await this.emailService.generateOTP()
        // hash otp
        const hashOtp=  await this.hasher.hash(String(otp))
        // create user
        const user = await this.repo.create({
            fName,
            lName,otp:hashOtp,
            email,
            password: 
            hash, 
            age, 
            phone, 
            address, 
            gender, 
            role 
        });
        // send otp in email
        this.eventBus.emit("confirmEmail", { email, otp })
        // return response
        return {
            _id: user._id as unknown as string,
            fName: user.fName,
            lName: user.lName,
            email: user.email,
            age: user.age,
            phone: user.phone,
            address: user.address,
            gender: user.gender, 
            role: user.role,
            createdAt: user.createdAt
        };
    }
}