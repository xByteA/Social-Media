import * as EN from "../../../../../shared/enums"
import { IUser } from "../../../models/User/IUser"

export interface ICreateRepository {
    create: (data: ICreateRepository.Params) => Promise<ICreateRepository.Result>
}

export namespace ICreateRepository {
    export type Params = {
        password?: string, 
        role?: EN.roleType,
        phone?: string,
        address?: string,
        fName?: string,
        lName?: string,
        userName?: string,
        email: string,
        confirmed?: boolean,
        provider?:string,
        image?: string, 
        otp?: string,
        age?: number,
        gender?: EN.genderType,

    }

    export type Result = IUser
}
