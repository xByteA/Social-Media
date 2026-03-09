import { Types } from "mongoose";

export interface IRevoke {
    userId: Types.ObjectId,
    tokenId: string,
    expireAt: Date
}