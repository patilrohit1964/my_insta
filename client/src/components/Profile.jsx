import { Avatar, Button } from '@mui/material';
import { AtSign, Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { id } = useParams()
  const { data, isError } = useGetUserProfile(id);
  const [activeTab, setActiveTab] = useState("posts");
  const { user, userProfile } = useSelector(state => state?.auth);
  const isLoggedUser = user?._id === userProfile?._id;
  const Follow = true;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayPost = activeTab === "posts" ? data?.user?.posts : data?.user?.bookmarks
  return (
    <div className='flex max-w-5xl justify-center mx-auto pl-10'>
      <div className='flex flex-col gap-20 p-8'>
        <div className='grid grid-cols-2'>
          <section className='flex items-center justify-center'>
            <Avatar src={data?.user?.profilePicture} alt="profilephoto" className='h-32 w-32' />
          </section>
          <section>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
                <span>{data?.user?.username}</span>
                {
                  isLoggedUser ? (
                    <>
                      <Link to="/account/edit"><Button variant='secondary' className='hover:bg-gray-200 h-8'>Edit profile</Button></Link>
                      <Button variant='secondary' className='hover:bg-gray-200 h-8'>View archive</Button>
                      <Button variant='secondary' className='hover:bg-gray-200 h-8'>Ad tools</Button>
                    </>
                  ) : (
                    Follow ? (
                      <>
                        <Button variant='secondary' className='h-8'>Unfollow</Button>
                        <Button variant='secondary' className='h-8'>Message</Button>
                      </>
                    ) : (
                      <Button className='bg-[#0095F6] hover:bg-[#3192d2] h-8'>Follow</Button>
                    )
                  )
                }
              </div>
              <div className='flex items-center gap-4'>
                <p><span className='font-semibold'>{data?.user?.posts.length} </span>posts</p>
                <p><span className='font-semibold'>{data?.user?.followers.length} </span>followers</p>
                <p><span className='font-semibold'>{data?.user?.following.length} </span>following</p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='font-semibold'>{data?.user?.bio || 'bio here...'}</span>
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600" variant='secondary'><AtSign /> <span className='pl-1'>{data?.user?.username}</span> </span>
                <span>🤯Learn code with patel mernstack style</span>
                <span>🤯Turing code into fun</span>
                <span>🤯DM for collaboration</span>
              </div>
            </div>
          </section>
        </div>
        <div className='border-t border-t-gray-200'>
          <div className='flex items-center justify-center gap-10 text-sm'>
            <span className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('posts')}>
              POSTS
            </span>
            <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>
              SAVED
            </span>
            <span className='py-3 cursor-pointer'>REELS</span>
            <span className='py-3 cursor-pointer'>TAGS</span>
          </div>
          <div className='grid grid-cols-3 gap-1'>
            {
              displayPost?.map((post) =>
              (
                <div key={post?._id} className='relative group cursor-pointer mt-3'>
                  <img src={post.image} alt='postimage' className='rounded-sm my-2 w-full aspect-square object-cover' />
                  <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='flex items-center text-white space-x-4'>
                      <button className='flex items-center gap-2 hover:text-gray-300'>
                        <Heart />
                        <span>{post?.likes.length}</span>
                      </button>
                      <button className='flex items-center gap-2 hover:text-gray-300'>
                        <MessageCircle />
                        <span>{post?.comments.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile