import { Model } from "mongoose";
import type { IRevoke } from "../../../models/Revoke/IRevoke";
import * as UR from "./index";



export class DbRevokeTokenRepository implements UR.ICreateRevokeToken, UR.IFindRevokebyId {

    constructor(private readonly model: Model<IRevoke>,) { }
    // create revoced token
    async create(data: UR.ICreateRevokeToken.Params): Promise<UR.ICreateRevokeToken.Result> {
        const doc = new this.model(data); 
        return await doc.save();
    }
    // find by token id
    async findOne(tokenId: string): Promise<UR.IFindRevokebyId.Result>{
        return await this.model.findOne({tokenId});
    }
}