import mongoose, { Model } from 'mongoose';
import { User, UserI } from './user.model';
import { UserCircle } from 'lucide-react';

export interface PostI{
    description:String,
    user:UserI,
    imageUrl?:string,
    likes?:string[],
    comments?:any   //will update comment type after creating comment-model
}

export interface postIDocument extends PostI, Document{
    createdAt: Date,
    updatedAt: Date
}

const postSchema = new mongoose.Schema<postIDocument>({
    description:{
        type:String,
        required:true
    },
    user:{
        userId:{
            type:String,
            required:true
        },
        firstName: {
            type:String,
            required:true
        },
        lastName: {
            type:String,
            required:true
        },
        profilePhoto: {
            type:String,
            required:true
        }
    },
    imageUrl:{
        type:String,
        default:""
    },
    likes:{
        type:[String]
    },
    comments:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }
},{timestamps:true});
export const Post : Model<postIDocument> = mongoose.models.Post || mongoose.model<postIDocument>("Post", postSchema);