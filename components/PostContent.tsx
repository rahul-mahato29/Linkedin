import { postIDocument } from "@/models/post.model";
import Image from "next/image";

const PostContent = ({post}:{post:postIDocument}) => {
    return (    
        <div className="my-3">
           <p className="my-3 px-4">{post?.description}</p>
           { 
            post?.imageUrl ? <Image src={post?.imageUrl} alt="post-image" width={50} height={50}/> : ""
           }
        </div>
    )
}

export default PostContent;