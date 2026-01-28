import type { NextFunction, Request, Response } from "express";
import { ConfirmEmailService } from "../../services/auth/confirmEmail";



export class ConfirmEmailController {
    constructor(private service: ConfirmEmailService){}
    handle= async(req:Request, res:Response, next:NextFunction)=>{
        try {
            await this.service.confirmEmail(req.body)
            res.status(200).json({message:"confirmed email"});
        } catch (err) {
            next(err);
        }
    }
}