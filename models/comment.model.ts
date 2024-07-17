import mongoose, { Document, Model } from "mongoose";
import { UserI } from "./user.model";

export interface CommentI{
    textMessage:String,
    User:UserI
}

export interface CommentIDocument extends CommentI, Document{
    createdAt: Date,
    updatedAt: Date
}

const commentSchema = new mongoose.Schema<CommentIDocument>({
    textMessage: {
        type: String,
        requried: true
    },
    User: {
        userId:{
            type:String,
            requried:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required: true
        },
        profilePhoto:{
            type:String,
            requried:true
        }
    }
}, {timestamps: true});
export const Comment: Model<CommentIDocument> = mongoose.models.comment || mongoose.model<CommentIDocument>("Comment", commentSchema);