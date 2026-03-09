import { IRevoke } from "../../../models/Revoke/IRevoke"


export interface IFindRevokebyId {
    findOne: (tokenId: string) => Promise<IFindRevokebyId.Result>
}
export namespace IFindRevokebyId {
    export type Result = IRevoke | null
}
