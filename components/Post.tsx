"use client";
import react from "react";
import ProfileImage from "./shared/ProfileImage";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import SocialOptions from "./SocialOptions";
import PostContent from "./PostContent";
import { postIDocument } from "@/models/post.model";
import { useUser } from "@clerk/nextjs";
import { deletePost } from "@/lib/serveraction";

const Post = ({ post }: { post: postIDocument }) => {
  const { user } = useUser();
  const fullName = post?.user?.firstName + " " + post?.user?.lastName;
  const loggedInUser = user?.id === post?.user?.userId;

  return (
    <div className="bg-white my-2 mx-2 md:mx-0 rounded-lg border border-gray-300">
      <div className="flex  justify-between p-4">
        <ProfileImage url={post?.user?.profilePhoto!} />
        <div className="flex items-center justify-between w-full ml-2">
          <div>
            <h1 className="text-sm font-bold cursor-pointer">
              {fullName}{" "}
              <Badge variant={"secondary"} className="ml-1">
                You
              </Badge>
            </h1>
            <p className="text-xs text-gray-500 lowercase">
              @{post?.user?.firstName}_{post?.user?.lastName}
            </p>
            <p className="text-xs text-gray-500">1hr</p>
          </div>
        </div>
        <div>
          {loggedInUser && <Button onClick={() => deletePost(post._id)} size={"icon"} className="rounded-full" variant={"outline"}> 
              <Trash2 />
          </Button>}
        </div>
      </div>
      <PostContent post={post} />
      <SocialOptions post={post} />
    </div>
  );
};

export default Post;
