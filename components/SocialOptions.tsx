import { MessageCircleMore, Repeat, Send, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { postIDocument } from "@/models/post.model";
import { useUser } from "@clerk/nextjs";
import { CommentInput } from "./CommentInput";
import { Comment } from "./comment";

const SocialOptions = ({ post }: { post: postIDocument }) => {
  const { user } = useUser();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [commentOpen, setCommentOpen] = useState(false);

  const likeOrDislike = async () => {
    if (!user) throw new Error(" User not authenticated");
    const tempLiked = liked;
    const tempLikes = likes;

    const dislike = likes?.filter((userId) => userId != user.id);
    const like = [...(likes ?? []), user.id];
    const newLike = liked ? dislike : like;

    setLiked(!liked);
    setLikes(newLike);

    const res = await fetch(
      `/api/posts/${post._id}/${liked ? "/dislike" : "/like"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user.id),
      }
    );
    if (!res.ok) {
      setLiked(tempLiked);
      throw new Error("Failed to like or dislike");
    }

    const fetchAllLikes = await fetch(`/api/posts/${post._id}/like`);
    if (!fetchAllLikes.ok) {
      setLikes(tempLikes);
      throw new Error("Failed to fetch likes");
    }

    const likeData = await fetchAllLikes.json();
    setLikes(likeData);
  };

  return (
    <div>
      <div className="text-sm mx-2 p-2 flex items-center justify-between border-b border-gray-500">
        {likes && likes.length > 0 && (
          <p className="text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer">
            {likes.length} likes
          </p>
        )}

        {post.comments && post.comments.length > 0 && (
          <p className="text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer">
            {post.comments.length} message
          </p>
        )}
      </div>
      <div className="flex justify-between items-center m-3">
        <Button onClick={likeOrDislike} variant={"ghost"}>
          <ThumbsUp className={`${liked && "fill-[#378FE9]"}`} />
          <p className={`${liked && "text-[#378FE9]"}`}>Like</p>
        </Button>
        <Button variant={"ghost"} onClick={() => setCommentOpen(!commentOpen)}>
          <MessageCircleMore />
          <p>Message</p>
        </Button>
        <Button variant={"ghost"}>
          <Repeat />
          <p>Repost</p>
        </Button>
        <Button variant={"ghost"}>
          <Send />
          <p>Send</p>
        </Button>
      </div>
      {
        commentOpen && (
            <div className="m-1">    
                <div className="p-2 pt-0">
                    <CommentInput postId={post._id}/>
                </div>
                <div className="p-2">
                    <Comment post={post}/>
                </div>
            </div>
        )
      }
    </div>
  );
};

export default SocialOptions;
