"use server";       //Server-Action
import { Post } from "@/models/post.model";
import { UserI } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server"; 
import {v2 as cloudinary} from 'cloudinary';
import connectDB from "./db";
import { connect } from "http2";
import { revalidatePath } from "next/cache";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});  

//creating post using server action
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
    
    const userDetails: UserI = {
        firstName: user.firstName || "Rahul",
        lastName: user.lastName || "Mahato",
        userId: user.id,
        profilePhoto: user.imageUrl
    }
    
    let uploadResponse;
    try {
        if(image){
            //create post with image
            uploadResponse = await cloudinary.uploader.upload(image);
            await Post.create({
                description: inputText,
                user: userDetails,
                imageUrl: uploadResponse.secure_url       //from cloudinary
            });
        }
        else{
            //create post with text only
            await Post.create({
                description: inputText,
                user: userDetails
            })
        }
        revalidatePath("/")
    } catch (error:any) {
        console.log("Something went wrong");
    }
}


//get all post using server action
export const getAllPosts = async () => {
    await connectDB();
    try{
        const posts = await Post.find().sort({createdAt: -1});   //sort a/c to recent post
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.log(error);
    }
}