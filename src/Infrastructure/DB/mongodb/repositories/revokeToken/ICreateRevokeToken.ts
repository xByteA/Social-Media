import { Types } from "mongoose"
import { IRevoke } from "../../../models/Revoke/IRevoke"

export interface ICreateRevokeToken {
    create: (data: ICreateRevokeToken.Params) => Promise<ICreateRevokeToken.Result>
}

export namespace ICreateRevokeToken {
    export type Params = {
            userId: Types.ObjectId,
            tokenId: string,
            expireAt: Date
    }

    export type Result = IRevoke
}
