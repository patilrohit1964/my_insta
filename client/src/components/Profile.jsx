import React from 'react'
import LayoutHelmet from './LayoutHelmet'
import { useSelector } from 'react-redux'
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userProfile } = useSelector(state => state.auth);
  const { id } = useParams()
  const { data, isError } = useGetUserProfile(id);
  console.log(userProfile);
  return (
    <LayoutHelmet title={"Profile"} description={"this is Profile"}>
      <div>
        <div>

        </div>
      </div>
    </LayoutHelmet>
  )
}

export default Profile