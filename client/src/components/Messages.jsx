import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useGetAllMessage from '../hooks/useGetAllMessage'
import useRtm from '../hooks/useRtm'

const Messages = ({ selectedUser }) => {
  useRtm();
  useGetAllMessage();
  const { messages } = useSelector(state => state.chat);
  const { user } = useSelector(state => state?.auth);
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
          <div className={`flex ${msg?.senderId === user?._id ? 'justify-end' : 'justify-start'} items-center`} key={msg?._id}>
            <div className={`${msg?.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-300'} py-1 px-4 rounded-lg order-1 break-words max-w-xs`}>
              {msg?.message}
            </div>
            <div className={`${msg?.senderId === user?._id ? 'order-2' : ''}`}>
              <img src={msg?.senderId === user?._id ? user?.profilePicture : selectedUser?.profilePicture} className={`h-6 w-6 rounded-full ${msg?.senderId === user?._id ? 'ml-2' : 'mr-2'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Messages