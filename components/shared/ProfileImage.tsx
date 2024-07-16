import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const ProfileImage = ({url}:{url:string}) => {
  return (
    <div>
      <Avatar className="size-16 border-2 border-white cursor-pointer">
        <AvatarImage src={url} />
      </Avatar>
    </div>
  );
};

export default ProfileImage;
