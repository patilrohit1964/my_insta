import React from 'react'
import LayoutHelmet from './LayoutHelmet'
import { useSelector } from 'react-redux'
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';

const Profile = () => {
  // const { userProfile } = useSelector(state => state.auth);
  const { id } = useParams()
  const { data, isError } = useGetUserProfile(id);
  console.log(data);
  return (
    <LayoutHelmet title={"Profile"} description={"this is Profile"}>
      <div>
        <div className='flex max-w-4xl justify-center mx-auto pl-10'>
          <div className='grid grid-cols-2'>
            <div className='flex items-center justify-center w-32 h-32'>
              <img src={data?.user?.profilePicture} className='h-full w-full object-center rounded-full' />
            </div>
            
          </div>
        </div>
      </div>
    </LayoutHelmet>
  )
}

export default Profile