import { postIDocument } from "@/models/post.model"
import ProfileImage from "./shared/ProfileImage"

export const Comment = ({post}:{post:postIDocument}) => {
    return (
        <div>
            {
                post?.comments?.map((comment: any) => {
                    return (
                        <div key={comment._id} className="flex gap-2 my-4">
                            <div className="mt-2"> 
                                <ProfileImage url={comment.user.profilePhoto}/>
                            </div>
                            <div className="flex flex-1 justify-between p-3 bg-[#F2F2F2]">
                                <div>
                                    <h1>{`${comment.user.firstName} ${comment.user.lastName}`}</h1>
                                    <p>@{comment.user.firstName}</p>
                                    <p>{comment.textMessage}</p>
                                </div>
                            </div>
                        </div>
                    )
                })   
            }
        </div>
    )
}