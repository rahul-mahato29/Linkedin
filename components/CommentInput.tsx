"use client";
import { useUser } from "@clerk/nextjs";
import ProfileImage from "./shared/ProfileImage"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createCommentAction } from "@/lib/serveraction";

export const CommentInput = ({postId}:{postId:any}) => {
    const {user} = useUser();

    const commentActionHandler = async (formData:FormData) => {
        try {
            if(!user) throw new Error('User not authenticated');
            await createCommentAction(postId, formData);
        } catch (error:any) {
            throw new Error('An error occured');
        }
    }


    return (
        <form action={(formData) => commentActionHandler(formData)}>
            <div className="flex items-center gap-2">
                <ProfileImage url={user?.imageUrl}/>
                <Input type="text" name="inputText" placeholder="Add a comment" className="rounded-full" />
                <Button type="submit" variant={'outline'} className="rounded-full text-sm">Send</Button>
            </div>
        </form>
    )
}

