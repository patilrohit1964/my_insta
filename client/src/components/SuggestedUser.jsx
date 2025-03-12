import React from 'react'
import LayoutHelmet from './LayoutHelmet'

const SuggestedUser = ({ suggestedUser }) => {
    console.log(suggestedUser);
    return (
        <LayoutHelmet title={"Suggested Users"} description={"Suggested users details"}>
            <div>
                <div className='my-8'>
                    <div className='flex items-center justify-between text-sm border border-red-500'>
                        <h1 className='font-semibold text-gray-600 mr-3'>Suggested For you</h1>
                        <span className='font-medium cursor-pointer'>See all</span>
                    </div>
                    <div>
                        {
                            suggestedUser?.map((user, index) => (
                                <div key={index} className='flex items-center gap-3 my-3'>
                                    <img src='https://bit.ly/sage-adebayo' alt='User' className='w-12 h-12 rounded-full' />
                                    <div className='flex-1'>
                                        <h3 className='font-semibold text-sm'>{user?.username}</h3>
                                        <p className='text-xs text-gray-500'>Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>
                                    <button className='bg-blue-500 text-white font-semibold py-1 px-2 rounded-full'>Follow</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </LayoutHelmet>

    )
}

export default SuggestedUser