import React from 'react'
import Posts from './Posts'
import LayoutHelmet from './LayoutHelmet'
const Feed = () => {
    return (
        <LayoutHelmet title={"Feed"} description={"this is Feed"}>
            <div className='flex-1 my-0 flex flex-col items-center pl-[20%]'>
                <Posts />
            </div>
        </LayoutHelmet>
    )
}

export default Feed