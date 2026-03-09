import { NextFunction, Request, Response } from "express"
import { IRefreshTokenService } from "../../interfaces/IRefreshTokenService"



export class RefreshTokenController{
    constructor(
        private readonly service: IRefreshTokenService
    ){}
    handle= async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const tokens = await this.service.refreshToken(req?.loggedInUser!)
            res.status(200).json({ message: "success", tokens })
        } catch (err) {
            next(err)
        }
    }
}