"use server";       //Server-Action
import { Post } from "@/models/post.model";
import { UserI } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server"; 
import {v2 as cloudinary} from 'cloudinary';
import connectDB from "./db";
import { revalidatePath } from "next/cache";
import { PostDialog } from "@/components/PostDialog";
import { Comment, CommentI } from "@/models/comment.model";
import { createDialogScope } from "@radix-ui/react-dialog";

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
        const posts = await Post.find().sort({createdAt: -1}).populate({path:'comments', options:{sort:{createAt: -1}}});   //sort a/c to recent post
        if(!posts) return [];
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.log(error);
    }
}

// delete post by id
export const deletePost = async (postId: any) => {
    await connectDB();
    const user = await currentUser();
    if(!user) throw new Error('User not authenticated');
    const post = await Post.findById(postId);
    if(!post) throw new Error('Post not found');

    if(post.user.userId != user.id){
        throw new Error("You are not allowed to delete this post");
    }

    try {
        await Post.deleteOne({_id: postId});
        revalidatePath("/");    
    } catch (error:any) {
        throw new Error('An error occurred', error);
    }
}


export const createCommentAction = async (postId:any, formData:FormData) => {
    try {
        const user = await currentUser();
        if(!user) throw new Error("User not authenticated");
        const inputText = formData.get('inputText') as string;
        if(!inputText) throw new Error("Field is required");
        if(!postId) throw new Error("post id requried");

        const userData : UserI = {
            firstName: user.firstName || 'Rahul',
            lastName: user.lastName || 'Mahato',
            userId: user.id,
            profilePhoto: user.imageUrl
        }

        const post = await Post.findById({_id: postId});
        if(!post) throw new Error('Post not found');

        const comment = await Comment.create({
            textMessage: inputText,
            User:userData,
        });
        post.comments?.push(comment._id as unknown as CommentI);
        await post.save();

        revalidatePath("/");

    } catch (error) {
        throw new Error('An error occurred');
    }
}