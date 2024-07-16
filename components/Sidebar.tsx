import Image from 'next/image';
import React from 'react'
import ProfileImage from './shared/ProfileImage';

const Sidebar = ({user}:{user:any}) => {
  return (
    <div className='hidden md:block w-[20%] h-fit border border-gray-300 bg-white rounded'>
        <div className='flex flex-col items-center relative'>
          <div>
            {
              user && (
                <Image
                  src={"/coverImage.jpeg"}
                  alt="coverImage"
                  width={200}
                  height={200}
                  className='w-full h-full rounded-t-md'
                />
              )
            }
          </div>
          <div className='absolute top-6 my-1'>
            <ProfileImage url={user ? user?.imageUrl : "/coverImage.jpeg"} />
          </div>
          <div className='border-b border-b-gray-300 w-full mt-10 p-3'>
              <div className='text-center'>
                  <h1 className='font-bold cursor-pointer'>{user ? `${user?.firstName} ${user?.lastName}` : "Rahul Mahato"}</h1>
                  <p className='text-xs text-gray-600'>Application Development Associate @ Accenture | SXC'23, Information Technology | Passionate Learner | Problem Solver</p>
              </div>
          </div>
          <div className='w-full p-4 border-b border-b-gray-300'>
            <span className='flex justify-between mb-1'>
              <h3 className='font-semibold text-gray-500 text-xs cursor-pointer hover:text-gray-700'>Profile View</h3>
              <p className='font-semibold text-blue-500 text-xs'>98</p>
            </span>
            <span>
              <h3 className='font-semibold text-gray-500 text-xs cursor-pointer hover:text-gray-700'>View all analytics</h3>
            </span>
          </div>
          <div className='w-full flex gap-1 items-center p-3'>
            <Image src={"/savedItem.png"} alt="saved-item" width={20} height={20} className='cursor-pointer'/>
            <span className='font-semibold text-gray-800 text-xs cursor-pointer'>Saved Items</span>
          </div>
        </div>
    </div>
  )
}

export default Sidebar;