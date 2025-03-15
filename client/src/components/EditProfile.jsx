import { Avatar } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const EditProfile = () => {
    const { user } = useSelector(state => state?.auth);
    return (
        <div className='flex max-w-2xl mx-auto pl-10'>
            <section>
                <h1 className='font-bold text-xl'>Edit Profile</h1>
                <div className='w-fit my-10 pr-10'>
                    <div className='flex items-center gap-3'>
                        <Link to={`/profile/${user?._id}`} className='hover:opacity-80'>
                            <Avatar src={user?.profilePicture} alt='not found' />
                        </Link>
                        <div className='flex flex-col items-center'>
                            <h1 className='font-bold text-sm'>{user?.username}</h1>
                            <span className='text-gray-600 text-sm'>{user?.bio || "Bio here..."}</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EditProfile