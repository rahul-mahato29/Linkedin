import mongoose, { Model } from 'mongoose';

export interface UserI{    //UserI - User Interface
    firstName:String,
    lastName:String,
    userId:String,
    profilePhoto?:String,
    bio?:String 
}
export interface UserIDocument extends UserI, Document{
    createdAt:Date,
    updatedAt:Date
}

const userSchema = new mongoose.Schema<UserIDocument>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    }
},{timestamps:true});

export const User:Model<UserIDocument> = mongoose.models?.User || mongoose.model<UserIDocument>("User", userSchema);