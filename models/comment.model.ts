import mongoose, { Document, Model, Schema } from "mongoose";
import { UserI } from "./user.model"; // Ensure this path is correct

// Interface for Comment
export interface CommentI {
    textMessage: string;
    User: {
        userId: string;
        firstName: string;
        lastName: string;
        profilePhoto?: string;
    };
}

// Interface for Comment document, including Mongoose Document properties
export interface CommentIDocument extends CommentI, Document {
    createdAt: Date;
    updatedAt: Date;
}

// Schema for Comment
const commentSchema = new Schema<CommentIDocument>({
    textMessage: {
        type: String,
        required: true
    },
    User: {
        userId: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        profilePhoto: {
            type: String
        }
    }
}, { timestamps: true });

// Define the model, ensuring it is not overwritten
export const Comment: Model<CommentIDocument> = mongoose.models.Comment || mongoose.model<CommentIDocument>("Comment", commentSchema);
