import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import useGetUserProfile from '../hooks/useGetUserProfile';
import LayoutHelmet from './LayoutHelmet';
import { AtSign, Heart } from 'lucide-react';
import { useState } from 'react';

const Profile = () => {
  // const { userProfile } = useSelector(state => state.auth);
  const { id } = useParams()
  const { data, isError } = useGetUserProfile(id);
  const [activeTab, setActiveTab] = useState("Posts");
  const isLoggedUser = true
  const Follow = true
  console.log(data)

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayPost = activeTab === "Posts" ? data?.user?.posts : data?.user?.bookmarks
  return (
    <LayoutHelmet title={"Profile"} description={"this is Profile"}>
      <div>
        <div className='flex max-w-5xl justify-center mx-auto pl-10 pt-10'>
          <div className='flex flex-col gap-20 p-8'>
            <div className='grid grid-cols-2'>
              <div className='flex items-center justify-center w-32 h-32'>
                <img src={data?.user?.profilePicture} className='h-full w-full object-center rounded-full' />
              </div>
              <div className='flex flex-col gap-5'>
                <div className='flex items-center gap-2'>
                  <span>{data?.user?.username}</span>
                  {
                    isLoggedUser ? (
                      <>
                        <Button variant='secondary' className='hover:bg-gray-200'>Edit Profile</Button>
                        <Button variant='secondary' className='hover:bg-gray-200'>View archive</Button>
                        <Button variant='secondary' className='hover:bg-gray-200'>Ad tools</Button>
                      </>
                    ) : (
                      Follow ?
                        <>
                          <button className='bg-gray-300 hover:bg-gray-600 p-2 rounded-md transition-all duration-300 hover:text-white'>Unfollow</button>
                          <button className='bg-gray-300 hover:bg-gray-600 p-2 rounded-md transition-all duration-300 hover:text-white'>Message</button>
                        </>
                        : (
                          <button className='bg-[#0095f6] hover:bg-[#59a8dc] p-2 text-white rounded-md'>Follow</button>
                        )
                    )
                  }
                </div>
                <div className='flex items-center justify-around'>
                  <p><span className="font-semibold">{data?.user?.posts?.length}</span> Post</p>
                  <p><span className="font-semibold">{data?.user?.following?.length}</span> Post</p>
                  <p><span className="font-semibold">{data?.user?.followers?.length}</span> Post</p>
                </div>
                <div className='flex flex-col'>
                  <span>{data?.user?.bio || "bio here..."}</span>
                  <span className="inline-flex items-center rounded-md bg-gray-50 py-1 text-xs font-medium text-gray-600">
                    <AtSign /> <span>{data?.user?.username}</span>
                  </span>
                </div>
                <span>Learn Code with rp</span>
                <span>Learn Code with rp</span>
                <span>Learn Code with rp</span>
              </div>
            </div>
            <div className='border-t border-t-gray-300'>
              <div className='flex items-center justify-center gap-10 text-sm'>
                <span className={`py-3 cursor-pointer ${activeTab === "Posts" ? 'font-bold' : ''}`} onClick={() => handleTabChange("Posts")}>
                  Posts
                </span>
                <span className={`py-3 cursor-pointer ${activeTab === "Saved" ? 'font-bold' : ''}`} onClick={() => handleTabChange("Saved")}>
                  Saved
                </span>
                <span className='py-3 cursor-pointer' onClick={() => handleTabChange("Reels")}>
                  Reels
                </span>
                <span className='py-3 cursor-pointer' onClick={() => handleTabChange("Tags")}>
                  Tags
                </span>
              </div>
              <div className='grid grid-cols-3 gap-2'>
                {
                  displayPost?.map((post) => (
                    <div key={post?._id} className='relative group cursor-pointer'>
                      <img src={post.image} alt="" className='rounded-sm my-2 w-full aspect-square object-cover h-full' />
                      <div className='rounded inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute'>
                        <div className='flex items-center text-white space-x-4'></div>
                        <button className='flex items-center gap-2 hover:text-gray-300'>
                          <Heart />
                          <span>{data?.user?.likes?.length}</span>
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutHelmet>
  )
}

export default Profile