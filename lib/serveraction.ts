"use server";       //Server-Action
import { Post } from "@/models/post.model";
import { UserI } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server"; 
import {v2 as cloudinary} from 'cloudinary';
import connectDB from "./db";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});  

export const createPostAction = async (inputText:string, selectedFile:string) => {
    await connectDB();
    const user = await currentUser();
    if(!user) {
        throw new Error('User not authenticated');
    }
    if(!inputText) {
        throw new Error('Input field is required');
    }

    const image = selectedFile;
    if(image){
        console.log("checkpoint-1");
    }
    
    const userDetails: UserI = {
        firstName: user.firstName || "Rahul",
        lastName: user.lastName || "Mahato",
        userId: user.id,
        profilePhoto: user.imageUrl
    }
    
    let uploadResponse;
    try {
        if(image){
            console.log("check-point-2")
            //create post with image
            uploadResponse = await cloudinary.uploader.upload(image);
            await Post.create({
                description: inputText,
                user: userDetails,
                imageUrl: uploadResponse.url       //from cloudinary
            });
        }
        else{
            console.log("Check-point-3")
            //create post with text only
            await Post.create({
                description: inputText,
                user: userDetails
            })
        }
    } catch (error:any) {
        console.log("Something went wrong");
    }
}