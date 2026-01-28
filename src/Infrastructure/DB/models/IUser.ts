import { Types } from "mongoose";
import * as EN from "../../../shared/enums/index";

export interface IUser {
    password: string,
    role: EN.roleType,
    phone: string,
    address: string,
    fName: string,
    lName: string,
    email: string,
    age: number,
    confirmed: boolean,
    otp?: string,
    changeCredentials?:string,
    gender: EN.genderType,
    _id: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}