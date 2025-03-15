import React from 'react'
import LayoutHelmet from './LayoutHelmet'
import { Link } from 'react-router-dom'

const SuggestedUser = ({ suggestedUsers }) => {

    return (
        <LayoutHelmet title={"Suggested Users"} description={"Suggested users details"}>
            <div>
                <div className='my-8'>
                    <div className='flex items-center justify-between text-sm'>
                        <h1 className='font-semibold text-gray-600 mr-3'>Suggested For you</h1>
                        <span className='font-medium cursor-pointer'>See all</span>
                    </div>
                    <div>
                        {
                            suggestedUsers?.map((user, index) => (
                                <Link to={`/profile/${user?._id}`} key={user?._id}>
                                    <div className='flex items-center gap-3 my-3'>
                                        <img src='https://bit.ly/sage-adebayo' alt='User' className='w-12 h-12 rounded-full' />
                                        <div className='flex-1'>
                                            <h3 className='font-semibold text-sm'>{user?.username}</h3>
                                            <p className='text-xs text-gray-500'>Bio: {user?.bio}</p>
                                        </div>
                                        <button className='bg-blue-500 text-white font-semibold py-1 px-2 rounded-full'>Follow</button>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </LayoutHelmet>

    )
}

export default SuggestedUser