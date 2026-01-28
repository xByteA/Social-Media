import { IUser } from "../../../models/IUser"

export interface IFindByemail {
    findByEmail: (email: string) => Promise<IFindByemail.Result>
}

export namespace IFindByemail {
    export type Result = IUser| null
}
