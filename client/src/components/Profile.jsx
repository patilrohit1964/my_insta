import React from 'react'
import LayoutHelmet from './LayoutHelmet'
import { useSelector } from 'react-redux'
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useParams } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';

const Profile = () => {
  // const { userProfile } = useSelector(state => state.auth);
  const { id } = useParams()
  const { data, isError } = useGetUserProfile(id);
  console.log(data);
  const isLoggedUser = false
  const Follow = true
  return (
    <LayoutHelmet title={"Profile"} description={"this is Profile"}>
      <div>
        <div className='flex max-w-5xl justify-center mx-auto pl-10 pt-10'>
          <div className='grid grid-cols-2 border justify-around'>
            <div className='flex items-center justify-center w-32 h-32'>
              <img src={data?.user?.profilePicture} className='h-full w-full object-center rounded-full' />
            </div>
            <div className='flex gap-5 border border-blue-500'>
              <div className='flex items-center gap-2 border border-red-500'>
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
            </div>
          </div>
        </div>
      </div>
    </LayoutHelmet>
  )
}

export default Profile