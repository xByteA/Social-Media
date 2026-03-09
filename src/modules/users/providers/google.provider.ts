import { OAuth2Client } from "google-auth-library"

import { AppError } from "../../../shared/utils/errors/AppError";
import { IGoogleProvider } from "../interfaces/IGoogleProvider";


// OAuth2 google provider
export class GoogleProvider implements IGoogleProvider {
    constructor(private client = new OAuth2Client()) {
    }

    async verifyToken(idToken: string){
        const ticket = await this.client.verifyIdToken({
            idToken,
            audience: "868520228744-ne1h3s7rkmnl2gm3ppc15fi6isq2bomk.apps.googleusercontent.com",  
        });
        const payload = ticket.getPayload();
        if (!payload) throw new AppError("Invalid Google Token", 404)
        const { email, email_verified, name, picture }= payload
        if (!email || !name || !email_verified  || !picture) {
            throw new AppError("Invalid token payload", 404);
        }
        return {
            email, 
            email_verified,
            name,
            picture
        }
    }
}