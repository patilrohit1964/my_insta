import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Messages = ({ selectedUser }) => {
  return (
    <div className='overflow-y-auto flex-1 p-4'>
      <div className='flex justify-center'>
        <div className='flex flex-col items-center justify-center'>
          <Avatar src={selectedUser?.profilePicture} />
          <span>{selectedUser?.username}</span>
          <Link to={`/${selectedUser?._id}/profile`}>
            <button>View Profile</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Messages