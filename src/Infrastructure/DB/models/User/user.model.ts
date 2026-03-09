import mongoose, { Types } from "mongoose";
import * as EN from "../../../../shared/enums/index";
import { IUser } from "./IUser";




const userschema= new mongoose.Schema<IUser>({
    fName: { type: String, required: true, trim: true, min: 2, max: 15 },
    lName: { type: String, required: true, trim: true, min: 2, max: 15 },
    email: { type: String, required: true, unique: true, trim: true },
    password: {
        type: String, select: false, trim: true, required: function (this: any) {
            return this.provider === EN.prividerType.google ? false : true
        }},
    age: {
        type: Number, min: 14, max: 100, required: function (this: any) {
            return this.provider === EN.prividerType.google ? false : true
        } },

    confirmed: {type: Boolean, default: false},
    otp: {type: String},
    phone: { type: String, unique: true,  sparse: true},
    address: { type: String },
    gender: {
        type: String, enum: Object.values(EN.genderType), required: function (this: any) {
            return this.provider === EN.prividerType.google ? false : true
        } },

    provider: {type:String,enum: Object.values(EN.prividerType), default:EN.prividerType.system},
    image: {type:String},
    role: { type: String, enum: Object.values(EN.roleType), default: EN.roleType.user },
},{
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

userschema.virtual("userName")
    .set(function (value) {
        const [fName, lName=" "] = value.split(" ")
        this.set({ fName, lName })
    })
    .get(function () {
        return `${this.fName} ${this.lName}`
    })

export const userModel= mongoose.models.Users || mongoose.model<IUser>("Users",userschema)