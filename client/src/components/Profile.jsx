import React from 'react'
import LayoutHelmet from './LayoutHelmet'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { userProfile } = useSelector(state => state.auth)
  console.log(userProfile)
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