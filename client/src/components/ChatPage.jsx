import { Avatar } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'

const ChatPage = () => {
    const { user, suggestedUsers } = useSelector(state => state.auth);
    const isOnline = true
    return (
        <div>
            <div className='flex ml-[16%] px-3 h-screen border border-blue-500'>
                <section className='border border-red-500 w-full'>
                    <h1 className='font-bold px-3 mb-4 text-xl'>{user?.username}</h1>
                    <hr className='mb-4 border border-gray-300' />
                    <div className='overflow-y-auto h-[80vh]'>
                        {suggestedUsers?.map((suggestedUser) => (
                            <div>
                                <Avatar src={suggestedUser?.profilePicture} />
                                <div className='flex flex-col'>
                                    <span className='font-medium'>{suggestedUser?.username}</span>
                                    <span className={`text-xs font-bold ${isOnline ? "text-green-600" : "text-red-600"}`}>
                                        {
                                            isOnline ? "Online" : "Offline"
                                        }
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ChatPage