import type { NextFunction, Request, Response } from "express";
import { IConfirmEmailService } from "../../interfaces/IConfirmEmailService";



export class ConfirmEmailController {
    constructor(private service: IConfirmEmailService){}
    handle= async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const confirm= await this.service.confirmEmail(req.body)
            res.status(200).json({ message: confirm});
        } catch (err) {
            next(err);
        }
    }
}