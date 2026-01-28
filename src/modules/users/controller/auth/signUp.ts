import { type NextFunction, Request, Response } from "express";
import { SignUpService } from "../../services/auth/signUp";


// Handle HTTP Req/Res
export class SignUpController {
    constructor(private userService: SignUpService){
    }

    handle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json({
                sucess: true,
                data: user
            });

        } catch (err) {
            next(err);

        }
    }; 
}
