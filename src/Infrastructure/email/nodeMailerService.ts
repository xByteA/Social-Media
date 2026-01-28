import nodemailer from "nodemailer";
import { IEmailService } from "./IEmailService";


export class NodemailerService implements IEmailService {
    private transporter;
    constructor() {

        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user:"abdelrahmanseif99@gmail.com",
                pass: "luswgmtshfuwnukl",
            },
        });
    }

    async sendEmail(to: string, subject: string, html: string): Promise<void> {
        const info = await this.transporter.sendMail({
            from: `"socialmediaApp" abdelrahmanseif99@gmail.com`,
            to,
            subject,
            html
        });
}

    async generateOTP(): Promise < number > {
    return Math.floor(Math.random() * 1000000);
}
}