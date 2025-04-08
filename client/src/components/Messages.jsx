import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useGetAllMessage from '../hooks/useGetAllMessage'

const Messages = ({ selectedUser }) => {
  useGetAllMessage();
  const { messages } = useSelector(state => state.chat);
  console.log(messages,"messsages")
  return (
    <div className='overflow-y-auto flex-1 p-4'>
      <div className='flex justify-center'>
        <div className='flex flex-col items-center justify-center'>
          <Avatar src={selectedUser?.profilePicture} />
          <span className='inline-block mt-2 mb-2'>{selectedUser?.username}</span>
          <Link to={`/${selectedUser?._id}/profile`}>
            <button className='bg-gray-300 p-2 rounded-lg hover:bg-gray-400'>View Profile</button>
          </Link>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        {messages && messages.map(msg => (
          <div className={`flex`} key={msg?._id}>
            <div>
              {msg?.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Messages