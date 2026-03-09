import { type NextFunction, Request, Response } from "express";
import { ISignUpService } from "../../interfaces/ISignUpService";

// Handle HTTP Req/Res
export class SignUpController {
    constructor(private userService: ISignUpService){}
    handle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json({
                message: "user created",
                data: user
            });
        } catch (err) {
            next(err);
        }
    }; 
}
