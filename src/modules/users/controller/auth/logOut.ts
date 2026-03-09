import { NextFunction, Request, Response } from "express";
import { ILogOutService } from "../../interfaces/ILogOutService";



export class LogOutController{
    constructor(
        private readonly service: ILogOutService
    ){}
    handle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const message = await this.service.logOut(req?.loggedInUser!)
            res.status(200).json({ message })
        } catch (err) {
            next(err)
        }
    }
}