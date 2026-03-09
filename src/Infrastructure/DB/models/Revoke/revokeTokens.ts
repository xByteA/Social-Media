import mongoose, { Types } from "mongoose";
import { IRevoke } from "./IRevoke";


const revokeTokenSchema = new mongoose.Schema<IRevoke>({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    tokenId: { type: String, required: true },
    expireAt: { type: Date, required: true }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

export const revokeTokenModel = mongoose.models.RevokeToken || mongoose.model<IRevoke>("RevokeToken", revokeTokenSchema)