import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

//fetch all comments
export const GET = async (req:NextRequest, {params}:{params:{postId:String}}) => {
    try {
        await connectDB();  
        const post = Post.findById({_id:params.postId});
        if(!post) return NextResponse.json({error: 'Post not found'});

        const comment = await post.populate({
            path:'comment', 
            options:{sort:{createdAt:-1}},
        });

        return NextResponse.json(comment);
    } catch (error:any) {
        return NextResponse.json({error: 'An error occurred.'});
    }
}