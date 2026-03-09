import { EventEmitter } from "events";
import { IEmailService } from "./IEmailService";
import { emailTemplate } from "./email.template";

export class EmailEventBus {
    private emitter = new EventEmitter();

    constructor(private emailService: IEmailService) {
        this.emitter.on("confirmEmail", async (data) => {
            await this.emailService.sendEmail(data.email, "Confirm Email", `Your OTP is ${emailTemplate(data.otp,"Email Confirmation")}`);
        });
    }
    emit(event: string, payload: any) {
        this.emitter.emit(event, payload);
    }
}
