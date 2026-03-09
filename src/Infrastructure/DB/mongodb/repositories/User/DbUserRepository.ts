import { Model } from "mongoose";
import * as UR from "./index";
import { IUser } from "../../../models/User/IUser";

export class DbUserRepository implements UR.ICreateRepository, UR.IFindByemail, UR.IFindById, UR.IupdateOne {
    constructor(private readonly model: Model<IUser>) { }
    // create user
    async create(data: UR.ICreateRepository.Params): Promise<UR.ICreateRepository.Result> {
        const doc = new this.model(data); 
        return await doc.save();
    }
    // find user by id
    async findById(id: UR.IFindById.Params): Promise<UR.IFindById.Result> {
        return await this.model.findById(id);
    }
    // find user by email 
    async findByEmail(email: string): Promise<UR.IFindByemail.Result> {
        return await this.model.findOne({email}).select("+password");
    }
    // update user data 
    async updateOne(filter: Record<string, any>, update: Record<string, any>): Promise < void> {
        await this.model.updateOne(filter, update)
    }
}
