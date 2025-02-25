import React from 'react'
import Post from './Post'

const Posts = () => {
    return (
        <div>
            {
                [1, 2, 3, 4, 5].map((el, idx) => (
                    <Post key={idx} />
                ))
            }
        </div>
    )
}

export default Posts