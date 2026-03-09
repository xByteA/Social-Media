import type { NextFunction, Request, Response } from "express"
import { ILognInGmailService } from "../../interfaces/ILognInGmailService"



export class LogInGmailController{
    constructor(
        private readonly service: ILognInGmailService 
    ){}
    handle= async (req:Request, res:Response, next:NextFunction)=>{
        try {
            const { idToken } = req.body;
            if (!idToken) return res.status(400).json({ message: "token id is required" });
            const tokens= await this.service.logInGmail(idToken)
            res.status(200).json({ message: "success", tokens })
        } catch (err) {
            next(err)
        }
    }
}



