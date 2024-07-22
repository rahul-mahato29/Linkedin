import { postIDocument } from "@/models/post.model"
import ProfileImage from "./shared/ProfileImage"

export const Comment = ({post}:{post:postIDocument}) => {
    return (
        <div>
            {
                post?.comments?.map((comment: any) => {
                    return (
                        <div key={comment._id} className="flex gap-2 my-3 p-1">
                            <div className="mt-2"> 
                                <ProfileImage url={comment.User.profilePhoto}/>
                            </div>
                            <div className="flex flex-1 justify-between rounded-lg p-3 bg-[#F2F2F2] m-1 mt-3">
                                <div>
                                    <h1 className="text-sm font-semibold">{`${comment.User.firstName} ${comment.User.lastName}`}</h1>
                                    <p className="lowercase text-xs">@{comment.User.firstName}</p>
                                    <p className="mt-2 text-sm">{comment.textMessage}</p>
                                </div>
                            </div>
                        </div>
                    )
                })   
            }
        </div>
    )
}