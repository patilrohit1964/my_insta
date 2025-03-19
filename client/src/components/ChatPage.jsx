import { Avatar } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'

const ChatPage = () => {
    const { user, suggestedUsers } = useSelector(state => state.auth);
    return (
        <div>
            <div className='flex ml-[18%] h-screen'>
                <section className='border border-red-500'>
                    <h1 className='font-bold px-3 mb-4 text-xl'>{user?.username}</h1>
                    <hr className='mb-4 border-b border-b-gray-600' />
                    <div className='overflow-y-auto h-[80vh]'>
                        {suggestedUsers?.map((suggestedUser) => (
                            <div>
                                <Avatar src={suggestedUser?.profilePicture} />
                                
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ChatPage