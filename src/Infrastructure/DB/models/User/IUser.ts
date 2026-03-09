import { Types } from "mongoose";
import * as EN from "../../../../shared/enums/index";

export interface IUser {
    password: string,
    role: EN.roleType,
    phone: string,
    address: string,
    userName?: string,
    fName: string,
    lName: string,
    email: string,
    age: number,
    confirmed: boolean,
    otp?: string,
    gender: EN.genderType,
    provider: string,
    image?:string
    _id: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}