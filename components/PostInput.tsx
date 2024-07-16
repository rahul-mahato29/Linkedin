"use client";

import React, { useState } from "react";
import ProfileImage from "./shared/ProfileImage";
import { Input } from "./ui/input";
import { PostDialog } from "./PostDialog";  

const PostInput = ({ user }: { user: any }) => {

  const [open, setOpen] = useState<Boolean>(false);
  const inputHandler = () => {
    setOpen(true);
  }

  return (
    <div className="bg-white p-3 pt-2 m-1 md:m-0 border border-gray-300 rounded-xl">
      <div className="flex items-center gap-3 p-1">
        <ProfileImage url={user?.imageUrl} />
        <Input
          type="text"
          placeholder="Start a post"
          className="rounded-full hover:bg-gray-100 h-12 cursor-pointer font-semibold"
          onClick={inputHandler}
        />
        <PostDialog setOpen={setOpen} open={open} src={user?.imageUrl} />
      </div>
      <div className="flex justify-around m-1 font-semibold text-gray-600 text-sm">
        <div>Media</div>
        <div>Event</div>
        <div>Write article</div>
      </div>
    </div>
  );
};

export default PostInput;
