import { IUser } from "../../../models/User/IUser"

export interface IFindById {
    findById: (account: IFindById.Params) => Promise<IFindById.Result>
}

export namespace IFindById {
    export type Params = {id: string}
    export type Result = IUser | null
}
