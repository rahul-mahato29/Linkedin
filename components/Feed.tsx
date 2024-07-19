import React from 'react'
import PostInput from './PostInput';
import AllPosts from './AllPosts';
import { getAllPosts } from '@/lib/serveraction';

const Feed = async ({user}:{user:any}) => {

  const userData = JSON.parse(JSON.stringify(user));  //directly we cannot send plain object from server component to client component.
  const posts = await getAllPosts();

  return (
    <div className='flex-1'>
      <PostInput user={userData}/>
      <AllPosts posts={posts}/>
    </div>
  )
}

export default Feed;