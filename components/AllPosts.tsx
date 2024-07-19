import React, { useState } from 'react'
import Post from './Post';
import { AnyBulkWriteOperation } from 'mongoose';
import { postIDocument } from '@/models/post.model';

const AllPosts = ({posts}:{posts:postIDocument[]}) => {

  return (
    <div> 
      {
        posts.map((post, index) => {
          return (
            <Post key={index} post={post}/>
          )
        })
      }
    </div>
  )
}

export default AllPosts;