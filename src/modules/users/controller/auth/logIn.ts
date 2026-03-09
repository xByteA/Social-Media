import { Request, Response, NextFunction } from "express";
import { ILognInService } from "../../interfaces/ILogInService";


export class LogInController{
    constructor(
        private readonly service: ILognInService
    ){}
    handle= async (req:Request, res:Response, next:NextFunction)=>{
        try {
            const tokens= await this.service.logIn(req.body)
            res.status(200).json({ message: "success", tokens })
        } catch (err) {
            next(err)
        }
    }
}